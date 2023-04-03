import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    uniID: {type: String, required: true},
    gender: String,
    email: String,
    faculty: String,
    major: String,
    loginEmail:String,
})

const User = mongoose.model("User", userSchema)

export {User}