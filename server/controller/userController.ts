import { recommand } from "../dao/user-dao"

// user Recommand 
// 3 same courses > in 2 same courses > in same major
export const userRecommand = async (req, res, next) => {

    const userCourses = req.body.courses
    // const userMajor = req.body.major
    const  allUsers = await recommand(userCourses,req.body.major)
    
    allUsers.sort((a, b) => b.courses.length - a.courses.length);

    console.log("allUsers",allUsers)

    res.send(allUsers)
}
