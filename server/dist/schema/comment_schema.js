"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const commentSchema = new mongoose_2.Schema({
    questionId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Question',
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
        ref: 'Comment',
        default: null,
    },
    replies: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'Reply',
        }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.Comment = Comment;
