"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// each year the course dates change
// therefore the course database will create a new course
// Separate documents in database
// e.g. 
// - CS732 S1 2023
// - CS732 S2 2024
const courseSchema = new Schema({
    course_code: { type: String, required: true },
    course_name: { type: String, required: true },
    CourseNName: { type: String, required: true },
    // course_display_name: { type: String, required: true }
});
const Course = mongoose_1.default.model("Course", courseSchema);
exports.Course = Course;
