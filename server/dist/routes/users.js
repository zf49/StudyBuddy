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
const user_dao_1 = require("../dao/user-dao");
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post("/register/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            name: req.body.name,
            uniID: req.body.uniID,
            gender: req.body.gender,
            email: req.body.email,
            faculty: req.body.faculty,
            major: req.body.major
        };
        if (user.name && user.uniID) {
            const newUser = yield (0, user_dao_1.createUser)(user);
            res.sendStatus(HTTP_CREATED);
        }
        else {
            res.json("User name or UniID cannot be empty!");
        }
    }
    catch (_a) {
        res.sendStatus(HTTP_BAD_REQUEST);
    }
}));
module.exports = router;
