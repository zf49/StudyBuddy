"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Major = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const majorSchema = new Schema({
    faculty: { type: String, required: true },
    major: { type: String, required: true },
});
const Major = mongoose_1.default.model("Major", majorSchema);
exports.Major = Major;
