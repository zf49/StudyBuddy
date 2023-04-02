import mongoose from "mongoose";

const Schema = mongoose.Schema;

const majorSchema = new Schema({
    faculty: {type: String, required: true},
    major: {type: String, required: true},
})

const Major = mongoose.model("Major", majorSchema)

export {Major}