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
exports.deleteQuestion = exports.postQuestion = exports.checkAllQuestion = void 0;
const question_dao_1 = require("../../dao/question-dao");
const checkAllQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allQuestions = yield (0, question_dao_1.getAllQuestion)();
    res.status(201).json(allQuestions);
});
exports.checkAllQuestion = checkAllQuestion;
const postQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authId, title, content, course, semester } = req.body;
    console.log(authId, title, content, course, semester);
    try {
        const addQues = yield (0, question_dao_1.addQuestion)(authId, title, content, course, semester);
        console.log(addQues);
        const allQuestions = yield (0, question_dao_1.getAllQuestion)();
        res.status(201).json({ success: true, data: allQuestions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'err' });
    }
});
exports.postQuestion = postQuestion;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('req.params',req.params.questionId)
    const questionId = req.params.questionId;
    yield (0, question_dao_1.deleteQuestionById)(questionId);
    const allQuestions = yield (0, question_dao_1.getAllQuestion)();
    res.json(allQuestions);
});
exports.deleteQuestion = deleteQuestion;
