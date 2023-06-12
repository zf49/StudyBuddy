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
exports.addCommentToQuestion = exports.addQuestion = exports.deleteQuestionById = exports.getQuestionById = exports.getAllQuestion = void 0;
const question_schema_1 = require("../schema/question_schema");
const mongoose_1 = require("mongoose");
const reply_schema_1 = require("../schema/reply_schema");
const getAllQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
    // const questions: IQuestion[] = await Question.find().populate('comments')
    const questions = yield question_schema_1.Question.find().populate({
        path: 'comments',
        populate: {
            path: 'replies',
            model: reply_schema_1.Reply,
            select: '-_id content authorId createdAt updatedAt',
        },
    });
    return questions;
});
exports.getAllQuestion = getAllQuestion;
const getQuestionById = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield question_schema_1.Question.findById(new mongoose_1.Types.ObjectId(questionId)).populate('comments');
    // console.log(question)
    return question;
});
exports.getQuestionById = getQuestionById;
const deleteQuestionById = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(questionId);
    const deleteQuestion = yield question_schema_1.Question.deleteOne({ _id: new mongoose_1.Types.ObjectId(questionId) });
});
exports.deleteQuestionById = deleteQuestionById;
const addQuestion = (authorId, title, content, semester, course) => __awaiter(void 0, void 0, void 0, function* () {
    const question = new question_schema_1.Question({
        authorId,
        title,
        content,
        semester,
        course
    });
    const postInfo = yield question.save();
    return postInfo;
});
exports.addQuestion = addQuestion;
const addCommentToQuestion = (comment, questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield question_schema_1.Question.findByIdAndUpdate(questionId, { $push: { comments: comment } }, { new: true });
    return question;
});
exports.addCommentToQuestion = addCommentToQuestion;
