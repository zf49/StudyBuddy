import mongoose from "mongoose";



const Schema = mongoose.Schema;


export interface INotification {
    sender: string,
    receiver: string,
    senderName: string,
    senderPic: string,
    msg: string,
    sendTime: Date,
    type: string
}

const notificationSchema = new Schema<INotification>({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    senderName: { type: String, required: true },
    senderPic: { type: String, required: true },
    msg: { type: String, required: true },
    sendTime: { type: Date, required: true },
    type: { type: String, required: true }
})

const Notification = mongoose.model("Notification", notificationSchema)

export { Notification }