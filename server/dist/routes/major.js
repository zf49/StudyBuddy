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
var express = require('express');
var router = express.Router();
const major_dao_1 = require("../dao/major-dao");
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculties = yield (0, major_dao_1.retriveFaculties)();
        const majors = yield (0, major_dao_1.retriveMajors)();
        res.json({ faculties: faculties, majors: majors });
    }
    catch (_a) {
    }
}));
module.exports = router;
