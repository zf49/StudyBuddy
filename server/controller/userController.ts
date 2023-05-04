import { getAllFriends, getUserFriends } from "../dao/friend-dao";
import { getUserProfile, recommend } from "../dao/user-dao"
import { ICourse } from "../schema/course_schema";
import { IUser } from "../schema/user-schema";

// user Recommand 
// 3 same courses > in 2 same courses > in same major
export const userRecommand = async (req, res, next) => {


    const userAuthID = req.body.authID

    console.log(userAuthID)

    const userProfile:IUser = await getUserProfile(req.body.authID)

      console.log(userProfile)

      // res.send(userProfile)
    const userCourses:ICourse[] = userProfile.courses
    // const userMajor = req.body.major
    const recommendedUsers = await recommend(userCourses, userProfile.major)

    recommendedUsers.sort((a, b) => b.courses.length - a.courses.length)

    // console.log("userCourses",userCourses)
    // console.log("recommendedUsers",recommendedUsers)
    const matchedCourses = recommendedUsers.map((user) => {
        const matched = user.courses.filter((course) => {
          return userCourses.some((userCourse) => {
            return userCourse.CourseNName === course.CourseNName;
          });
        });
        return {
          ...user,
          matchedCourses: matched,
          matchedCount: matched.length,
        };
      });
      

      matchedCourses.sort((a,b)=>{
        return b.matchedCount - a.matchedCount
      })

      console.log(matchedCourses);


    // TODO : logic unitest
    // recommendedUsers.sort((a, b) => b.courses.length - a.courses.length);

    // TODO: check the user in allUsers arr whether has been follow, if yes, not show
    const allFriends = await getUserFriends(userAuthID)

    // const allFriends = await getAllFriends()
    // console.log("allFriends",allFriends[0]._id.toString())

    const nonFriendRecommendedUsers = matchedCourses.filter((user) => {
        return allFriends.every((friend) => {
            return user._id.toString() !== friend.friendID;
        });
    });

    console.log("reco", nonFriendRecommendedUsers)

    res.send(nonFriendRecommendedUsers)
}
