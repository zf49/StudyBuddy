"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const replySchema = new mongoose_2.Schema({
    commentId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    parentId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Reply',
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Reply = mongoose_1.default.model("Reply", replySchema);
exports.Reply = Reply;
