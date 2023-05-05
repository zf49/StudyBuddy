import mongoose from "mongoose";
import { Course, ICourse } from "./course_schema";

const Schema = mongoose.Schema;

export interface IUser {
    name: string,
    uniID: string,
    gender: string,
    email: string,
    faculty: string,
    major: string,
    authID: string,
    userAvatar: string,
    courses:ICourse[]
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    uniID: {type: String, required: true},
    gender: String,
    email: String,
    faculty: String,
    major: String,
    authID:String,
    userAvatar:String,
    // semester: String,
    courses:[Object]
})

const User = mongoose.model("User", userSchema)

export {User}


