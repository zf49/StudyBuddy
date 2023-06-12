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
const joi_1 = __importDefault(require("joi"));
const emailController_1 = require("../controller/emailController");
const friend_dao_1 = require("../dao/friend-dao");
var express = require('express');
var router = express.Router();
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadValidate = joi_1.default.object({
        authID: joi_1.default.string().required(),
        friendID: joi_1.default.string().required()
    }).validate(req.body);
    if (payloadValidate.error) {
        console.log(payloadValidate.error);
    }
    else {
        const userFriendsArr = yield (0, friend_dao_1.getUserFriends)(payloadValidate.value.authID);
        console.log("userFriends", userFriendsArr);
        yield (0, friend_dao_1.addFriend)(payloadValidate.value.authID, payloadValidate.value.friendID);
        const sendEmail = yield (0, emailController_1.emailSend)(payloadValidate.value.authID, payloadValidate.value.friendID);
        if (sendEmail === false) {
            res.sendStatus(HTTP_NOT_FOUND);
        }
        else {
            res.sendStatus(HTTP_OK);
        }
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadValidate = joi_1.default.object({
        authID: joi_1.default.string().required(),
        friendID: joi_1.default.string().required()
    }).validate(req.body);
    if (payloadValidate.error) {
        console.log(payloadValidate.error);
    }
    else {
        yield (0, friend_dao_1.deleteFriend)(payloadValidate.value.authID, payloadValidate.value.friendID);
        res.sendStatus(HTTP_OK);
    }
}));
router.get('/fellower/:authID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authIDValidate = joi_1.default.string().required().validate(req.params.authID);
    if (authIDValidate.error) {
        console.log(authIDValidate.error);
    }
    else {
        const friends = yield (0, friend_dao_1.findFellowers)(authIDValidate.value);
        console.log('friends', friends);
        // const uniqueFriendsArr = friends.reduce((unique, current) => {
        //     const friendID = current.friendID;
        //     if (!unique.some(friend => friend.friendID === friendID)) {
        //       unique.push(current);
        //     }
        //     return unique;
        //   }, []);
        //   console.log('uniqueFriendsArr',uniqueFriendsArr)
        res.json(friends);
    }
}));
router.get('/:authID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authIDValidate = joi_1.default.string().required().validate(req.params.authID);
    if (authIDValidate.error) {
        console.log(authIDValidate.error);
    }
    else {
        const friends = yield (0, friend_dao_1.findFriends)(authIDValidate.value);
        console.log(friends);
        // const uniqueFriendsArr = friends.reduce((unique, current) => {
        //     const friendID = current.friendID;
        //     if (!unique.some(friend => friend.friendID === friendID)) {
        //       unique.push(current);
        //     }
        //     return unique;
        //   }, []);
        res.json(friends);
    }
}));
router.get('/detail/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const iDValidate = joi_1.default.string().required().validate(req.params.id);
    if (iDValidate.error) {
        console.log(iDValidate.error);
    }
    else {
        const detail = yield (0, friend_dao_1.findFriendDetail)(iDValidate.value);
        res.json(detail);
    }
}));
router.post('/checkfollow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadValidate = joi_1.default.object({
        authID: joi_1.default.string().required(),
        friendID: joi_1.default.string().required()
    }).validate(req.body);
    if (payloadValidate.error) {
        console.log(payloadValidate.error);
    }
    else {
        const ifFollow = yield (0, friend_dao_1.checkFollow)(payloadValidate.value.authID, payloadValidate.value.friendID);
        res.json(ifFollow);
    }
}));
router.post('/checkself', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadValidate = joi_1.default.object({
        authID: joi_1.default.string().required(),
        friendID: joi_1.default.string().required()
    }).validate(req.body);
    if (payloadValidate.error) {
        console.log(payloadValidate.error);
    }
    else {
        const ifSelf = yield (0, friend_dao_1.checkSelf)(payloadValidate.value.authID, payloadValidate.value.friendID);
        res.json(ifSelf);
    }
}));
module.exports = router;
