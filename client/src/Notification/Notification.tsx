import { useEffect } from "react"
import { socket } from "../Router/IndexRouter"
import React from "react"


export interface INotification {
    ID: string,
    sender: string,
    receiver: string,
    senderName: string,
    senderPic: string,
    msg: string,
    sendTime: Date,
    type: string
}


export default function Notification() {
    const [notifications, setNotifications] = React.useState<INotification[]>()


    useEffect(() => {
        function getNotifications() {
            socket.emit("getNotifications")
            socket.on("getNotifications", (notifications)=>{
                setNotifications(notifications)
            })
        }
        getNotifications()
    },[])


    return (
        <div>

        </div>
    )
}