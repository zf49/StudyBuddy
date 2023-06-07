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
exports.postComment = void 0;
const question_dao_1 = require("../../dao/question-dao");
const comment_dao_1 = require("../../dao/comment_dao");
const mongoose_1 = require("mongoose");
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { comment, questionId, comment_author_id } = req.body;
    // get Question by id
    // create a new comment
    const addComment = yield (0, comment_dao_1.postNewComment)(comment_author_id, comment, new mongoose_1.Types.ObjectId(questionId));
    const updatedQuestion = yield (0, question_dao_1.addCommentToQuestion)(addComment, questionId);
    const question = yield (0, question_dao_1.getQuestionById)(questionId);
    const allQuestions = yield (0, question_dao_1.getAllQuestion)();
    res.json(allQuestions);
});
exports.postComment = postComment;
