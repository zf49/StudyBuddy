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
exports.initCourseData = exports.initMajorData = exports.initUserData = void 0;
const user_schema_1 = require("../schema/user-schema");
const user_json_1 = __importDefault(require("../db/user.json"));
const f_m_json_1 = __importDefault(require("../db/f&m.json"));
const courses_json_1 = __importDefault(require("../db/courses.json"));
const major_schema_1 = require("../schema/major-schema");
const course_schema_1 = require("../schema/course_schema");
function initUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield user_schema_1.User.count()) == 0) {
            user_json_1.default.map((user) => __awaiter(this, void 0, void 0, function* () {
                const dummyUser = new user_schema_1.User(user);
                yield dummyUser.save();
            }));
        }
    });
}
exports.initUserData = initUserData;
function initMajorData() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield major_schema_1.Major.count()) == 0) {
            f_m_json_1.default.map((major) => __awaiter(this, void 0, void 0, function* () {
                const dummyMajor = new major_schema_1.Major(major);
                yield dummyMajor.save();
            }));
        }
    });
}
exports.initMajorData = initMajorData;
function initCourseData() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield course_schema_1.Course.count()) == 0) {
            courses_json_1.default.map((course) => __awaiter(this, void 0, void 0, function* () {
                const dummyCourse = new course_schema_1.Course(course);
                yield dummyCourse.save();
            }));
        }
    });
}
exports.initCourseData = initCourseData;
