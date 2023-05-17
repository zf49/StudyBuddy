import { Notification } from "../schema/notification-schema";




export async function retriveNotification(userID: string) {
    return await Notification.find({ "receiver": userID })
}


export async function addNotification(sender: string, receiver: string, senderName: string, senderPic: string, msg: string, sendTime: Date, type: string) {
    const newNotification = new Notification({ sender: sender, receiver: receiver, senderName: senderName, senderPic: senderPic, msg, sendTime: sendTime, type: type })
    return await newNotification.save()
}

export async function deleteNotification(notificationID: string) {
    return await Notification.deleteOne({ "_id": notificationID })
}

export async function deleteMsgNotifications(sender: string, receiver: string, type: string) {
    return await Notification.deleteMany({ sender: sender, receiver: receiver, type: type })
}

export async function deleteNotifications(sender: string, receiver: string){
    return await Notification.deleteMany({ sender: sender, receiver: receiver })
}

export async function deleteNotificationBySender(sender: string, receiver: string, type: string){
    return await Notification.deleteOne({ sender: sender, receiver: receiver, type: type })
}