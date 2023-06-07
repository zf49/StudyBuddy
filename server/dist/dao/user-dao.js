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
exports.getUserName = exports.updateUserProfile = exports.getUserProfile = exports.checkAuthID = exports.recommend = exports.searchUser = exports.createUser = void 0;
const user_schema_1 = require("../schema/user-schema");
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUser = new user_schema_1.User(user);
        yield dbUser.save();
        return dbUser;
    });
}
exports.createUser = createUser;
// search user
//TODO: when finish adding courses func, add new field, whitch can search user courses
function searchUser(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_schema_1.User.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { uniID: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { faculty: { $regex: keyword, $options: "i" } },
                { major: { $regex: keyword, $options: "i" } },
                { "courses.CourseNName": { $regex: new RegExp(keyword, "i") } }
            ]
        }).sort({ name: 1 }).collation({ locale: 'en', strength: 2 });
    });
}
exports.searchUser = searchUser;
function recommend(courses, usermajor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(courses);
            console.log(usermajor);
            const courseCodes = courses.map((course) => course.course_code);
            const filteredUsers = yield user_schema_1.User.find({
                $or: [
                    { major: usermajor },
                    { courses: { $elemMatch: { course_code: { $in: courseCodes } } } }
                ]
            });
            console.log("Filtered users: ", filteredUsers);
            return filteredUsers;
        }
        catch (error) {
            console.error("error", error);
            return [];
        }
    });
}
exports.recommend = recommend;
function checkAuthID(authID) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_schema_1.User.find({ 'authID': authID });
    });
}
exports.checkAuthID = checkAuthID;
const getUserProfile = (authId) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield user_schema_1.User.find({ 'authID': authId });
    return userProfile[0];
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (authId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_schema_1.User.updateOne({ 'authID': authId }, { $set: user });
    return updatedUser;
});
exports.updateUserProfile = updateUserProfile;
const getUserName = (authId) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = yield user_schema_1.User.find({ authID: authId }, { name: 1, email: 1 });
    return userName;
});
exports.getUserName = getUserName;
