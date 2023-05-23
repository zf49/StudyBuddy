import jwtDecode, { JwtPayload } from "jwt-decode"
import { Server } from "socket.io"
import { IUser, User } from "../schema/user-schema"
import { addFriend, checkFriends, deleteFriend, findFriendDetail } from "../dao/friend-dao"
import { addMsg, retriveMsg } from "../dao/msg_dao"
import { getUserProfile } from "../dao/user-dao"
import dayjs from "dayjs";
import { ICourse } from "../schema/course_schema"
import { IMsg } from "../schema/msg_schema"
import { addNotification, deleteMsgNotifications, deleteNotification, deleteNotificationBySender, deleteNotifications, retriveNotification } from "../dao/notification-dao"

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

        socket.on("Ping", () => {
            socket.emit("Pong")
        })

        socket.on("startChat", async (friendID: string) => {
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
                socket.emit("notFriends")
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
                if (io.sockets.adapter.rooms.get(payload.friendID)) {
                    var targetUserChat: string = null
                    const listenerName = `joinedChat${msg.id.toString()}`
                    socket.on(listenerName, async (joinedChat: string) => {
                        targetUserChat = joinedChat
                        if (targetUserChat == userID) {
                            io.sockets.in(payload.friendID).emit("newMsg", newMsg)
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
                        } else {
                            const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                            io.sockets.in(payload.friendID).emit("newNotificationAlert", notification)
                        }
                        socket.removeAllListeners(listenerName)
                        if (timeout) {
                            clearTimeout(timeout)
                        }
                    })
                    io.sockets.in(payload.friendID).emit("checkChat", msg.id.toString(), userID)
                    const timeout = setTimeout(async () => {
                        socket.removeAllListeners(listenerName)
                        const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                    }, 5000)
                } else {
                    const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                }

                // var targetUserChat: string = null
                // const listenerName = `joinedChat${msg.id.toString()}`
                // socket.on(listenerName, (joinedChat: string) => {
                //     targetUserChat = joinedChat
                // })
                // io.sockets.in(payload.friendID).emit("checkChat", msg.id.toString(), userID)
                // setTimeout(async () => {
                //     socket.off(listenerName, (joinedChat: string) => {
                //         targetUserChat = joinedChat
                //     })
                //     if (targetUserChat == userID) {
                //         io.sockets.in(payload.friendID).emit("newMsg", newMsg)
                //         console.log("in chat")
                //     } else if (targetUserChat == "notification") {
                //         const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                //         const newNotification: INotification = {
                //             _id: notification._id.toString(),
                //             sender: notification.sender,
                //             receiver: notification.receiver,
                //             senderName: notification.senderName,
                //             senderPic: notification.senderPic,
                //             msg: notification.msg,
                //             sendTime: notification.sendTime,
                //             type: notification.type

                //         }
                //         io.sockets.in(payload.friendID).emit("newNotification", newNotification)
                //         console.log(newNotification)
                //     } else {
                //         const notification = await addNotification(newMsg.sender, newMsg.receiver, newMsg.senderName, newMsg.senderPic, newMsg.msg, newMsg.sendTime, "msg")
                //         io.sockets.in(payload.friendID).emit("newNotificationAlert", notification)

                //     }
                // }, 100)

            }
        })

        socket.on("getNotificationCount", async () => {
            const notificationCount = (await retriveNotification(userID)).length
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
            socket.emit("getNotifications", notifications)
            socket.emit("getNotificationCount", notifications.length)
        })

        socket.on("deleteNotificationMsg", async (id: string) => {
            await deleteNotification(id)
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications", notifications)
            socket.emit("getNotificationCount", notifications.length)
        })

        socket.on("unFriend", async (friendID: string) => {
            await deleteFriend(userID, friendID)
            await deleteFriend(friendID, userID)
            await deleteNotifications(userID, friendID)
            await deleteNotifications(friendID, userID)
            io.sockets.in(friendID).emit("statusChange")
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications", notifications)
            socket.emit("getNotificationCount", notifications.length)
            const friendNotifications = await retriveNotification(friendID)
            io.sockets.in(friendID).emit("getNotifications", friendNotifications)
            io.sockets.in(friendID).emit("getNotificationCount", friendNotifications.length)

        })

        socket.on("sendRequest", async (friendID: string) => {
            const userInfo: IUser = (await getUserProfile(authID))[0]
            const currentTime: Date = dayjs().toDate()
            const notification = await addNotification(userID, friendID, userInfo.name, userInfo.userAvatar, "Requested to be your friend", currentTime, "request")
            if (io.sockets.adapter.rooms.get(friendID)) {
                var targetUserChat: string = null
                const listenerName = `joinedChat${notification.id.toString()}`
                socket.on(listenerName, async (joinedChat: string) => {
                    targetUserChat = joinedChat
                    if (targetUserChat == "notification") {
                        io.sockets.in(friendID).emit("newNotification", notification)
                    } else {
                        io.sockets.in(friendID).emit("newNotificationAlert", notification)
                    }
                    io.sockets.in(friendID).emit("statusChange")
                    socket.removeAllListeners(listenerName)
                    if (timeout) {
                        clearTimeout(timeout)
                    }
                })
                io.sockets.in(friendID).emit("checkChat", notification.id.toString(), userID)
                const timeout = setTimeout(async () => {
                    socket.removeAllListeners(listenerName)
                }, 5000)
            }





            // var targetUserChat: string = null
            // const listenerName = `joinedChat${notification.id.toString()}`
            // socket.on(listenerName, (joinedChat: string) => {
            //     targetUserChat = joinedChat
            // })
            // io.sockets.in(friendID).emit("checkChat", notification.id.toString(), userID)
            // setTimeout(async () => {
            //     socket.off(listenerName, (joinedChat: string) => {
            //         targetUserChat = joinedChat
            //     })
            //     if (targetUserChat == "notification") {
            //         io.sockets.in(friendID).emit("newNotification", notification)
            //     } else {
            //         io.sockets.in(friendID).emit("newNotificationAlert", notification)

            //     }
            //     io.sockets.in(friendID).emit("statusChange")
            // }, 100)
            const friendInfo: IUser = await findFriendDetail(friendID)
            const selfNotification = await addNotification(friendID, userID, friendInfo.name, friendInfo.userAvatar, "Pending friend request", currentTime, "pendingRequest")
            socket.emit("newNotification", selfNotification)
        })

        socket.on("acceptRequest", async (friendID: string) => {
            await addFriend(userID, friendID)
            await addFriend(friendID, userID)
            await deleteNotificationBySender(friendID, userID, "request")
            await deleteNotificationBySender(userID, friendID, "pendingRequest")
            const userInfo: IUser = (await getUserProfile(authID))[0]
            const friendInfo: IUser = await findFriendDetail(friendID)
            const currentTime: Date = dayjs().toDate()
            const notification = await addNotification(userID, friendID, userInfo.name, userInfo.userAvatar, "They've approved your friend request!", currentTime, "newFriend")
            const selfNotification = await addNotification(friendID, userID, friendInfo.name, friendInfo.userAvatar, "You just got youself a new friend!", currentTime, "newFriend")
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications", notifications)
            socket.emit("getNotificationCount", notifications.length)

            if (io.sockets.adapter.rooms.get(friendID)) {
                var targetUserChat: string = null
                const listenerName = `joinedChat${notification.id.toString()}`
                socket.on(listenerName, async (joinedChat: string) => {
                    targetUserChat = joinedChat
                    if (targetUserChat != "notification") {
                        io.sockets.in(friendID).emit("newNotificationAlert", notification)
                    }
                    const notifications = await retriveNotification(friendID)
                    io.sockets.in(friendID).emit("getNotifications", notifications)
                    io.sockets.in(friendID).emit("getNotificationCount", notifications.length)
                    io.sockets.in(friendID).emit("statusChange")
                    socket.removeAllListeners(listenerName)
                    if (timeout) {
                        clearTimeout(timeout)
                    }
                })
                io.sockets.in(friendID).emit("checkChat", notification.id.toString(), userID)
                const timeout = setTimeout(async () => {
                    socket.removeAllListeners(listenerName)
                }, 5000)
            }


            // var targetUserChat: string = null
            // const listenerName = `joinedChat${notification.id.toString()}`
            // socket.on(listenerName, (joinedChat: string) => {
            //     targetUserChat = joinedChat
            // })
            // io.sockets.in(friendID).emit("checkChat", notification.id.toString(), userID)
            // setTimeout(async () => {
            //     socket.off(listenerName, (joinedChat: string) => {
            //         targetUserChat = joinedChat
            //     })
            //     if (targetUserChat != "notification") {
            //         io.sockets.in(friendID).emit("newNotificationAlert", notification)
            //     }
            //     const notifications = await retriveNotification(friendID)
            //     io.sockets.in(friendID).emit("getNotifications", notifications)
            //     io.sockets.in(friendID).emit("getNotificationCount", notifications.length)
            //     io.sockets.in(friendID).emit("statusChange")
            // }, 100)
        })

        socket.on("denyRequest", async (friendID) => {
            await deleteNotificationBySender(friendID, userID, "request")
            await deleteNotificationBySender(userID, friendID, "pendingRequest")
            const userInfo: IUser = (await getUserProfile(authID))[0]
            const currentTime: Date = dayjs().toDate()
            const notification = await addNotification(userID, friendID, userInfo.name, userInfo.userAvatar, "They've refused your friend request!", currentTime, "refused")
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications", notifications)
            socket.emit("getNotificationCount", notifications.length)

            if (io.sockets.adapter.rooms.get(friendID)) {
                var targetUserChat: string = null
                const listenerName = `joinedChat${notification.id.toString()}`
                socket.on(listenerName, async (joinedChat: string) => {
                    targetUserChat = joinedChat
                    if (targetUserChat != "notification") {
                        io.sockets.in(friendID).emit("newNotificationAlert", notification)
                    }
                    const notifications = await retriveNotification(friendID)
                    io.sockets.in(friendID).emit("getNotifications", notifications)
                    io.sockets.in(friendID).emit("getNotificationCount", notifications.length)
                    io.sockets.in(friendID).emit("statusChange")
                    socket.removeAllListeners(listenerName)
                    if (timeout) {
                        clearTimeout(timeout)
                    }
                })
                io.sockets.in(friendID).emit("checkChat", notification.id.toString(), userID)
                const timeout = setTimeout(async () => {
                    socket.removeAllListeners(listenerName)
                }, 5000)
            }





            // var targetUserChat: string = null
            // const listenerName = `joinedChat${notification.id.toString()}`
            // socket.on(listenerName, (joinedChat: string) => {
            //     targetUserChat = joinedChat
            // })
            // io.sockets.in(friendID).emit("checkChat", notification.id.toString(), userID)
            // setTimeout(async () => {
            //     socket.off(listenerName, (joinedChat: string) => {
            //         targetUserChat = joinedChat
            //     })
            //     if (targetUserChat != "notification") {
            //         io.sockets.in(friendID).emit("newNotificationAlert", notification)
            //     }
            //     const notifications = await retriveNotification(friendID)
            //     io.sockets.in(friendID).emit("getNotifications", notifications)
            //     io.sockets.in(friendID).emit("getNotificationCount", notifications.length)
            //     io.sockets.in(friendID).emit("statusChange")
            // }, 100)
        })

        socket.on("cancelRequest", async (friendID) => {
            await deleteNotificationBySender(userID, friendID, "request")
            await deleteNotificationBySender(friendID, userID, "pendingRequest")
            const notifications = await retriveNotification(userID)
            socket.emit("getNotifications", notifications)
            socket.emit("getNotificationCount", notifications.length)
            const targetNotifications = await retriveNotification(friendID)
            io.sockets.in(friendID).emit("getNotifications", targetNotifications)
            io.sockets.in(friendID).emit("getNotificationCount", targetNotifications.length)
            io.sockets.in(friendID).emit("statusChange")
        })



        socket.on("disconnect", () => onDisconnect())


        async function onDisconnect() {
            console.log("disconnect")
        }
    }


}