import { getAllFriends, getUserFriends } from "../dao/friend-dao";
import { getUserProfile, recommend } from "../dao/user-dao"
import { ICourse } from "../schema/course_schema";
import { IUser } from "../schema/user-schema";



// user Recommand 
// 3 same courses > in 2 same courses > in same major
export const userRecommand = async (req, res) => {

    const userAuthID = req.body.authID

    console.log(userAuthID)

    const userProfile = await getUserProfile(req.body.authID)

      // res.send(userProfile)
    const userCourses:ICourse[] = userProfile.courses
    // const userMajor = req.body.major
    const recommendedUsers = await recommend(userCourses, userProfile.major)

    recommendedUsers.sort((a, b) => b.courses.length - a.courses.length)

    const matchedCourses = recommendedUsers.map((user) => {
      const matched = user.courses.filter((course) => {
        return userCourses.some((userCourse) => {
          return userCourse.CourseNName === course.CourseNName;
        });
      });
      return {
        ...user.toObject(),
        courses: user.courses,
        matchedCourses: matched,
        matchedCount: matched.length,
      };
    });

    
      matchedCourses.sort((a,b)=>{
        return b.matchedCount - a.matchedCount
      })


      console.log("matchedCourses",matchedCourses)


     // TODO : logic unitest
    // recommendedUsers.sort((a, b) => b.courses.length - a.courses.length);

    // TODO: check the user in allUsers arr whether has been follow, if yes, not show
    const allFriends = await getUserFriends(userProfile._id.toString())

    // const allFriends = await getAllFriends()

    console.log("allfriends",allFriends)
    const nonFriendRecommendedUsers = matchedCourses.filter((user) => {
        return allFriends.every((friend) => {
            return user._id.toString() !== friend.friendID && user._id.toString() !== userProfile._id.toString();
        });
    });


    res.send(nonFriendRecommendedUsers)
}



export const getUserByID = async (req,res)=>{
  console.log(req.body)
  const userProfile = await getUserProfile(req.body.authID)

  res.json(userProfile)

}