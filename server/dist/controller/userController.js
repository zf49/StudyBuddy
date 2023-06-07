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
exports.getUserByID = exports.userRecommand = void 0;
const friend_dao_1 = require("../dao/friend-dao");
const user_dao_1 = require("../dao/user-dao");
// user Recommand 
// 3 same courses > in 2 same courses > in same major
const userRecommand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuthID = req.body.authID;
    console.log('req.body', req.body);
    const userProfile = yield (0, user_dao_1.getUserProfile)(req.body.authID);
    // res.send(userProfile)
    const userCourses = userProfile.courses;
    // const userMajor = req.body.major
    const recommendedUsers = yield (0, user_dao_1.recommend)(userCourses, userProfile.major);
    const arr = recommendedUsers.filter((user) => {
        return user.authID !== userAuthID;
    });
    arr.sort((a, b) => b.courses.length - a.courses.length);
    console.log('recommendedUsers', recommendedUsers);
    const matchedCourses = arr.map((user) => {
        const matched = user.courses.filter((course) => {
            return userCourses.some((userCourse) => {
                return userCourse.CourseNName === course.CourseNName;
            });
        });
        return Object.assign(Object.assign({}, user.toObject()), { courses: user.courses, matchedCourses: matched, matchedCount: matched.length });
    });
    matchedCourses.sort((a, b) => {
        return b.matchedCount - a.matchedCount;
    });
    console.log("matchedCourses", matchedCourses);
    // TODO : logic unitest
    // recommendedUsers.sort((a, b) => b.courses.length - a.courses.length);
    // TODO: check the user in allUsers arr whether has been follow, if yes, not show
    const allFriends = yield (0, friend_dao_1.getUserFriends)(userProfile._id.toString());
    // const allFriends = await getAllFriends()
    console.log('allFriends', allFriends);
    const nonFriendRecommendedUsers = allFriends.length > 0 ? matchedCourses.filter((user) => {
        return allFriends.every((friend) => {
            return user._id.toString() !== friend.friendID && user._id.toString() !== userProfile._id.toString();
        });
    }) : matchedCourses;
    console.log("nonFriendRecommendedUsers", nonFriendRecommendedUsers);
    res.send(nonFriendRecommendedUsers);
    // res.send(matchedCourses)
});
exports.userRecommand = userRecommand;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield (0, user_dao_1.getUserProfile)(req.body.authID);
    console.log('userProfile', userProfile);
    res.json(userProfile);
});
exports.getUserByID = getUserByID;
