import { Friend } from "../schema/friend-schema";
import { User } from "../schema/user-schema";


export async function addFriend(authID: string, friendID: string) {
    const userID = (await User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf()
    const newFriend = new Friend({ userID: userID, friendID: friendID })
    return await newFriend.save()
}

export async function getAllFriends(){
    const allFriends = await Friend.find()
    return allFriends
}

export async function getUserFriends(userID: string) {
    const allFriends = await Friend.find({
      userID: userID,
    });
    return allFriends;
}

export async function findFriends(authID: string) {
    const userID = (await User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf()
    const friends = await Friend.aggregate([
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


    ])
    console.log(friends)
    return friends
}


export async function findFriendDetail(ID: string) {
    const detail = await User.findById(ID).select({ "_id": false, "authID": false })
    return detail
}

export async function checkFollow(authID: string, friendID: string) {
    const userID = (await User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf()
    const follow = await Friend.findOne({ userID: userID, friendID: friendID })
    if (follow) {
        return true
    } else {
        return false
    }
}

export async function checkSelf(authID: string, friendID: string){
    const userID = (await User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf()
    if(userID == friendID){
        return true
    }else{
        return false
    }
}

export async function deleteFriend(authID: string, friendID: string) {
    const userID = (await User.findOne({ authID: authID }).select({ "_id": true }))._id.valueOf()
    return await Friend.deleteOne({ userID: userID, friendID: friendID })
}


export async function getFriendEmailByFriendId(friendID: string){

    



}
