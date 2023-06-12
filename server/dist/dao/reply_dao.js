"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReplyToComment = exports.addNewReply = void 0;
const mongoose_1 = require("mongoose");
const comment_schema_1 = require("../schema/comment_schema");
const reply_schema_1 = require("../schema/reply_schema");
const addNewReply = (commentId, content, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = new reply_schema_1.Reply({
        commentId: new mongoose_1.Types.ObjectId(commentId),
        content: content,
        authorId: authorId
    });
    console.log('reply', reply);
    const postReply = yield reply.save();
    return reply;
});
exports.addNewReply = addNewReply;
const addReplyToComment = (reply, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_schema_1.Comment.findByIdAndUpdate(commentId, { $push: { replies: reply } }, { new: true });
    return comment;
});
exports.addReplyToComment = addReplyToComment;
