"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const friendSchema = new Schema({
    userID: { type: String, required: true },
    friendID: { type: String, required: true }
});
const Friend = mongoose_1.default.model("Friend", friendSchema);
exports.Friend = Friend;
