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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const joi_1 = __importDefault(require("joi"));
const user_dao_1 = require("../dao/user-dao");
const userController_1 = require("./../controller/userController");
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
// get search user result
router.post('/:keyword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keywordValidate = joi_1.default.string().required().validate(req.params.keyword);
    if (keywordValidate.error) {
        console.error(keywordValidate.error);
    }
    else {
        const userResult = yield (0, user_dao_1.searchUser)(keywordValidate.value);
        res.json(userResult);
    }
}));
// update userProfile
router.patch('/profile/:authID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authIDValidate = joi_1.default.string().required().validate(req.params.authID);
    if (authIDValidate.error) {
        console.error(authIDValidate.error);
    }
    else {
        const userDataValidate = joi_1.default.object({
            name: joi_1.default.string().required(),
            uniID: joi_1.default.string().required(),
            gender: joi_1.default.string().required().allow(null, ''),
            email: joi_1.default.string().required().allow(null, ''),
            faculty: joi_1.default.string().required().allow(null, ''),
            major: joi_1.default.string().required().allow(null, ''),
            authID: joi_1.default.string().required(),
            userAvatar: joi_1.default.string().required(),
            semester: joi_1.default.string().required(),
            courses: joi_1.default.array().items(joi_1.default.object({
                course_code: joi_1.default.string().required(),
                course_name: joi_1.default.string().required(),
                CourseNName: joi_1.default.string().required()
            }).unknown(true)).required().allow(null, '')
        }).unknown(true).validate(req.body);
        if (userDataValidate.error) {
            console.error(userDataValidate.error);
        }
        else {
            const updatedUser = yield (0, user_dao_1.updateUserProfile)(authIDValidate.value, userDataValidate.value);
            res.json(updatedUser);
        }
    }
}));
router.post('/api/getUserProfile', userController_1.getUserByID);
// set pic
// router.patch('/:authID/pic',async (req, res, next) => {
//   res.json('aaaaaaaaaa');
// });
/* GET users listing. */
router.get('/:uniID', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uniIDValidate = joi_1.default.string().required().validate(req.params.uniID);
    if (uniIDValidate.error) {
        console.error(uniIDValidate.error);
    }
    else {
        const user = yield (0, user_dao_1.getUserProfile)(uniIDValidate.value);
        console.log('user', user);
        res.json(user);
    }
}));
// Get users login Email
router.get('/authID/:authID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authIDValidate = joi_1.default.string().required().validate(req.params.authID);
    console.log(authIDValidate.value, "123123123123");
    if (authIDValidate.error) {
        console.error(authIDValidate.error);
    }
    else {
        const isHave = yield (0, user_dao_1.checkAuthID)(authIDValidate.value);
        res.send(isHave);
    }
}));
// user recommend
router.post("/api/recomand", userController_1.userRecommand);
// router.post("/api/recommendations/:page",spiltpage)
// sign up
router.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDataValidate = joi_1.default.object({
            name: joi_1.default.string().required(),
            uniID: joi_1.default.string().required(),
            gender: joi_1.default.string().required().allow(null, ''),
            email: joi_1.default.string().required().allow(null, ''),
            faculty: joi_1.default.string().required().allow(null, ''),
            major: joi_1.default.string().required().allow(null, ''),
            authID: joi_1.default.string().required(),
            // semester: Joi.string().required(),
            userAvatar: joi_1.default.string().required(),
        }).validate(req.body);
        if (userDataValidate.error) {
            console.error(userDataValidate.error);
        }
        else {
            const newUser = yield (0, user_dao_1.createUser)(userDataValidate.value);
            res.sendStatus(HTTP_CREATED);
            console.log(newUser);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(HTTP_BAD_REQUEST);
    }
}));
module.exports = router;
