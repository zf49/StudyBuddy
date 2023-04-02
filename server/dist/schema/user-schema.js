"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    uniID: { type: Number, required: true },
    gender: String,
    email: String,
    faculty: String,
    major: String
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
