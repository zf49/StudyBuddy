import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IMajor {
    faculty: string,
    major: string
}

const majorSchema = new Schema<IMajor>({
    faculty: {type: String, required: true},
    major: {type: String, required: true},
})

const Major = mongoose.model("Major", majorSchema)

export {Major}