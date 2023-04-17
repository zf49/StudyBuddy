import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IFriend {
    userID: string,
    friendID: string
}


const friendSchema = new Schema<IFriend>({
    userID: { type: String, required: true },
    friendID: { type: String, required: true }

})

const Friend = mongoose.model("Friend", friendSchema)

export { Friend }