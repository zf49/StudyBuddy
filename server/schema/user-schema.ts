import mongoose from "mongoose";
import { Course } from "./course_schema";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    uniID: {type: String, required: true},
    gender: String,
    email: String,
    faculty: String,
    major: String,
    authID:String,
    userAvatar:String,
    courses:[Course]
})

const User = mongoose.model("User", userSchema)

export {User}