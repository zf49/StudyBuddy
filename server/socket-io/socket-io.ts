import jwtDecode, { JwtPayload } from "jwt-decode"
import { Server } from "socket.io"
import { IUser, User } from "../schema/user-schema"
import { checkFriends, findFriendDetail } from "../dao/friend-dao"
import { addMsg, retriveMsg } from "../dao/msg_dao"
import { getUserProfile } from "../dao/user-dao"
import dayjs from "dayjs";
import { ICourse } from "../schema/course_schema"
import { IMsg } from "../schema/msg_schema"

export interface IPayload {
    friendID: string,
    msg: string
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
                setTimeout(() => {
                    socket.off(listenerName, (joinedChat: string) => {
                        targetUserChat = joinedChat
                    })
                    if (targetUserChat == userID) {
                        io.sockets.in(payload.friendID).emit("newMsg", newMsg)
                        console.log("in chat")
                    } else {
                        console.log("not in chat")
                    }
                }, 100)

            }
        })
        socket.on("disconnect", () => onDisconnect())


        async function onDisconnect() {

        }
    }


}