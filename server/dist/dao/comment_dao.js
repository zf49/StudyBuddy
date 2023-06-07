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
exports.postNewComment = exports.getAllComment = void 0;
const comment_schema_1 = require("../schema/comment_schema");
const getAllComment = () => __awaiter(void 0, void 0, void 0, function* () {
    const allComment = yield comment_schema_1.Comment.find();
    return allComment;
});
exports.getAllComment = getAllComment;
const postNewComment = (authorId, content, questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = new comment_schema_1.Comment({
        authorId,
        questionId,
        content
    });
    const postComment = yield comment.save();
    return postComment;
});
exports.postNewComment = postNewComment;
