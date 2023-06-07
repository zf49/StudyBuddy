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
exports.postNewReply = void 0;
const question_dao_1 = require("../../dao/question-dao");
const reply_dao_1 = require("../../dao/reply_dao");
const postNewReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentID, authorId, content } = req.body;
    const reply = yield (0, reply_dao_1.addNewReply)(commentID, content, authorId);
    const comment = yield (0, reply_dao_1.addReplyToComment)(reply, commentID);
    console.log('newcomment', comment);
    const allQuestions = yield (0, question_dao_1.getAllQuestion)();
    res.json(allQuestions);
});
exports.postNewReply = postNewReply;
