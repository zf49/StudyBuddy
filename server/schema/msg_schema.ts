import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IMsg {
    sender: string,
    receiver: string,
    senderName: string,
    senderPic: string,
    msg: string,
    sendTime: Date
}

const msgSchema = new Schema<IMsg>({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    senderName: { type: String, required: true },
    senderPic: { type: String, required: true },
    msg: { type: String, required: true },
    sendTime: { type: Date, required: true }
})

const Msg = mongoose.model("Msg", msgSchema)

export { Msg }