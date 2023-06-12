"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    uniID: { type: String, required: true },
    gender: String,
    email: String,
    faculty: String,
    major: String,
    authID: String,
    userAvatar: String,
    semester: String,
    courses: [Object]
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
