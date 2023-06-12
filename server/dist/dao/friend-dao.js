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
exports.getFriendEmailByFriendId = exports.deleteFriend = exports.checkSelf = exports.checkFollow = exports.findFriendDetail = exports.findFriends = exports.findFellowers = exports.getUserFriends = exports.getAllFriends = exports.addFriend = void 0;
const friend_schema_1 = require("../schema/friend-schema");
const user_schema_1 = require("../schema/user-schema");
function addFriend(authID, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = (yield user_schema_1.User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf();
        const newFriend = new friend_schema_1.Friend({ userID: userID, friendID: friendID });
        return yield newFriend.save();
    });
}
exports.addFriend = addFriend;
function getAllFriends() {
    return __awaiter(this, void 0, void 0, function* () {
        const allFriends = yield friend_schema_1.Friend.find();
        return allFriends;
    });
}
exports.getAllFriends = getAllFriends;
function getUserFriends(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const allFriends = yield friend_schema_1.Friend.find({
            userID: userID,
        });
        console.log('1123123123');
        return allFriends;
    });
}
exports.getUserFriends = getUserFriends;
function findFellowers(authID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userIDInDB = (yield user_schema_1.User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf();
        const friends = yield friend_schema_1.Friend.aggregate([
            { $match: { friendID: userIDInDB } },
            { $addFields: { userIDObj: { "$toObjectId": "$userID" } } },
            {
                $lookup: {
                    from: "users",
                    localField: "userIDObj",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            { $unwind: "$userInfo" },
            { $addFields: { name: "$userInfo.name", uniID: "$userInfo.uniID", ID: "$userInfo._id", avatar: "$userInfo.userAvatar" } },
            {
                $project: {
                    _id: false,
                    "name": 1,
                    "uniID": 1,
                    "ID": 1,
                    "avatar": 1
                }
            },
        ]);
        console.log(friends);
        return friends;
    });
}
exports.findFellowers = findFellowers;
function findFriends(authID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = (yield user_schema_1.User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf();
        const friends = yield friend_schema_1.Friend.aggregate([
            { $match: { userID: userID } },
            { $addFields: { friendIDObj: { "$toObjectId": "$friendID" } } },
            {
                $lookup: {
                    from: "users",
                    localField: "friendIDObj",
                    foreignField: "_id",
                    as: "friendInfo"
                }
            },
            { $addFields: { name: "$friendInfo.name", uniID: "$friendInfo.uniID", ID: "$friendInfo._id", avatar: "$friendInfo.userAvatar" } },
            { $unwind: "$name" },
            { $unwind: "$uniID" },
            { $unwind: "$ID" },
            { $unwind: "$avatar" },
            {
                $project: {
                    _id: false,
                    "name": 1,
                    "uniID": 1,
                    "ID": 1,
                    "avatar": 1
                }
            },
        ]);
        console.log(friends);
        return friends;
    });
}
exports.findFriends = findFriends;
function findFriendDetail(ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const detail = yield user_schema_1.User.findById(ID).select({ "_id": false, "authID": false });
        return detail;
    });
}
exports.findFriendDetail = findFriendDetail;
function checkFollow(authID, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = (yield user_schema_1.User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf();
        const follow = yield friend_schema_1.Friend.findOne({ userID: userID, friendID: friendID });
        if (follow) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.checkFollow = checkFollow;
function checkSelf(authID, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = (yield user_schema_1.User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf();
        if (userID == friendID) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.checkSelf = checkSelf;
function deleteFriend(authID, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = (yield user_schema_1.User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf();
        return yield friend_schema_1.Friend.deleteOne({ userID: userID, friendID: friendID });
    });
}
exports.deleteFriend = deleteFriend;
function getFriendEmailByFriendId(friendID) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.getFriendEmailByFriendId = getFriendEmailByFriendId;
