import jwtDecode, { JwtPayload } from "jwt-decode"
import { Server } from "socket.io"
import { IUser, User } from "../schema/user-schema"
import { checkFriends, findFriendDetail } from "../dao/friend-dao"
import { addMsg, retriveMsg } from "../dao/msg_dao"
import { getUserProfile } from "../dao/user-dao"
import dayjs from "dayjs";
import { ICourse } from "../schema/course_schema"
import { IMsg } from "../schema/msg_schema"
import { addNotification, deleteMsgNotifications, deleteNotification, retriveNotification } from "../dao/notification-dao"

export interface IPayload {
    friendID: string,
    msg: string
}

interface INotification {
    _id: string,
    sender: string,
    receiver: string,
    senderName: string,
    senderPic: string,
    msg: string,
    sendTime: Date,
    type: string
}

export default function createSocketIoConnection(server) {
    console.log(1)
    const io = new Server(server)

    io.on("connection", (socket) => onConnection(socket))

    return io


    async function onConnection(socket) {
        const token = socket.handshake.query.token
        const decoded = jwtDecode<JwtPayload>(token)
        const authID = decoded.sub
        const userID = (await User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf().toString()
        var joinedChat: string = null
        socket.join(userID)
        console.log(`joined${userID}`)

        socket.on("Ping", () => {
            socket.emit("Pong")
        })

        socket.on("startChat", async (friendID: string) => {
            console.log("startChat")
            const follow = await checkFriends(userID, friendID)
            const followBack = await checkFriends(friendID, userID)
            const friendName = (await findFriendDetail(friendID)).name
            if (follow || followBack) {
                joinedChat = friendID
                const msgs = await retriveMsg(userID, friendID)
                socket.emit("friends", msgs, friendName)
                await deleteMsgNotifications(friendID, userID, "msg")
                const notificationCount = (await retriveNotification(userID)).length
                socket.emit("getNotificationCount", notificationCount)

            } else {
                console.log("not followed")
            }
        })


        socket.on("checkChat", (msgID: string, userID: string) => {
            io.sockets.in(userID).emit("sendChat", msgID, joinedChat)
        })

        socket.on("leaveChat", () => {
            joinedChat = null
        })


        socket.on("sendMsg", async (payload: IPayload) => {
            const follow = await checkFriends(userID, payload.friendID)
            const followBack = await checkFriends(payload.friendID, userID)
            if (follow || followBack) {
                const currentTime: Date = dayjs().toDate()
                const userInfo: IUser = (await getUserProfile(authID))[0]
                const msg = await addMsg(userID, payload.friendID, userInfo.name, userInfo.userAvatar, payload.msg, currentTime)
                const newMsg: IMsg = {
                    sender: userID,
                    receiver: payload.friendID,
                    senderName: userInfo.name,
                    senderPic: userInfo.userAvatar,
                    msg: payload.msg,
                    sendTime: currentTime
                }
                socket.emit("newMsg", newMsg)
                var targetUserChat: string = null
                const listenerName = `joinedChat${msg.id.toString()}`
                socket.on(listenerName, (joinedChat: string) => {
                    targetUserChat = joinedChat
                })
                io.sockets.in(payload.friendID).emit("checkChat", msg.id.toString(), userID)
                setTimeout(async () => {
                    socket.off(listenerName, (joinedChat: string) => {
                        targetUserChat = joinedChat
                    })
                    if (targetUserChat == userID) {
                        io.sockets.in(payload.friendID).emit("newMsg", newMsg)
                        console.log("in chat")
                    } else if (targetUserChat == "notification") {
                        const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                        const newNotification: INotification = {
                            _id: notification._id.toString(),
                            sender: notification.sender,
                            receiver: notification.receiver,
                            senderName: notification.senderName,
                            senderPic: notification.senderPic,
                            msg: notification.msg,
                            sendTime: notification.sendTime,
                            type: notification.type

                        }
                        io.sockets.in(payload.friendID).emit("newNotification", newNotification)
                        console.log(newNotification)
                    } else {
                        const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                        io.sockets.in(payload.friendID).emit("newNotificationAlert", notification)

                    }
                }, 100)

            }
        })

        socket.on("getNotificationCount", async () => {
            console.log("count")
            const notificationCount = (await retriveNotification(userID)).length
            console.log(notificationCount)
            socket.emit("getNotificationCount", notificationCount)
        })

        socket.on("getNotifications", async () => {
            joinedChat = "notification"
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications", notifications)
        })

        socket.on("leaveNotification", () => {
            joinedChat = null
        })

        socket.on("deleteAllMsgFromSender", async (sender: string, receiver: string, type: string) => {
            await deleteMsgNotifications(sender, receiver, type)
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications",notifications)
            socket.emit("getNotificationCount", notifications.length)
        })

        socket.on("deleteNotificationMsg", async (id: string) => {
            await deleteNotification(id)
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications",notifications)
            socket.emit("getNotificationCount", notifications.length)
        })

        socket.on("disconnect", () => onDisconnect())


        async function onDisconnect() {

        }
    }


}