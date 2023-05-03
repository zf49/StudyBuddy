import { getAllFriends } from "../dao/friend-dao";
import { recommend } from "../dao/user-dao"
import { IUser } from "../schema/user-schema";

// user Recommand 
// 3 same courses > in 2 same courses > in same major
export const userRecommand = async (req, res, next) => {

    const userCourses = req.body.courses
    // const userMajor = req.body.major
    const recommendedUsers = await recommend(userCourses, req.body.major)
    
    // TODO : logic unitest
    recommendedUsers.sort((a, b) => b.courses.length - a.courses.length);

    // TODO: check the user in allUsers arr whether has been follow, if yes, not show

    const allFriends = await getAllFriends()
    // console.log("allFriends",allFriends[0]._id.toString())

    const nonFriendRecommendedUsers = recommendedUsers.filter((user) => {
        return allFriends.every((friend) => {
            return user._id.toString() !== friend.friendID;
        });
    });

    console.log("reco", nonFriendRecommendedUsers)

    res.send(nonFriendRecommendedUsers)
}
