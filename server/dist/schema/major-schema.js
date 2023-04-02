"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Major = void 0;
const mongoose_1 = require("mongoose");
const Schema = mongoose_1.default.Schema;
const majorSchema = new Schema({
    faculty: { type: String, required: true },
    major: { type: String, required: true },
});
const Major = mongoose_1.default.model("Major", majorSchema);
exports.Major = Major;
