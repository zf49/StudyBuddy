"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.emailSend = void 0;
const nodemailer = __importStar(require("nodemailer"));
const user_dao_1 = require("../dao/user-dao");
const emailSend = (authID, friendID) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(authID);
    const user = yield (0, user_dao_1.getUserName)(authID);
    console.log('emial', user);
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'wangzhifang97@live.com',
            pass: 'wzf!@#000'
        },
        host: "smtp.live.com",
        port: 587,
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3'
        }
    });
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'wangzhifang000@gmail.com',
    //         pass: 'wzf!@#00'
    //     },
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true
    // })
    // TODO : get real address
    const mailOptions = {
        from: 'wangzhifang97@live.com',
        to: 'chriswang49@outlook.com',
        subject: `${user[0].name} has followed you!`,
        html: `<html>
            <body style="color: #333; font-family: Arial, sans-serif;">
                <h1 style="color: #4F8A10;">${user[0].name} has followed you!</h1>
                <p>${user[0].name} has already followed you! If you want to check the info of this user, please access <b>Study Buddy</b>!</p>
                <p style="text-align: center;">
                <a href="http://localhost:3000/login" style="background-color: #4F8A10; color: #fff; padding: 10px 20px; text-decoration: none;">Visit Study Buddy</a>
                </p>
                <img src="https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-green-wave-point-geometric-banner-image_7082.jpg" alt="Study Buddy Image" style="width: 100%;"/>
            </body>
        </html>`
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.emailSend = emailSend;
