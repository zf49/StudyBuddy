
import { ICourse } from "../schema/course_schema";
import {IUser, User} from "../schema/user-schema"

export async function createUser(user: object) {
    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

// search user
//TODO: when finish adding courses func, add new field, whitch can search user courses
export async function searchUser(keyword:string) {
    return await User.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { uniID: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { faculty: { $regex: keyword, $options: "i" } },
          { major: { $regex: keyword, $options: "i" } },
          { "courses.CourseNName": { $regex: new RegExp(keyword, "i") } }
        ]
      }).sort({name:1}).collation( { locale: 'en', strength: 2 } )
}



export async function recommend(courses: ICourse[], usermajor: string) {
  try {
  
    console.log(courses)
    console.log(usermajor)


    const courseCodes = courses.map((course) => course.course_code);
    const filteredUsers = await User.find({
      $or: [
        { major: usermajor },
        { courses: { $elemMatch: { course_code: { $in: courseCodes } } } }
      ]
    });

    console.log("Filtered users: ", filteredUsers);
    return filteredUsers;

  } catch (error) {
    console.error("error", error);
    return []
  }
}
  

export async function checkAuthID(authID:String) {
    return await User.find({'authID':authID})
}

export const getUserProfile = async (authId:string)=>{
   const userProfile =  await User.find({'authID':authId})
   return userProfile[0]
}


export const updateUserProfile = async (authId:string,user:object)=>{
    const updatedUser = await User.updateOne(
        {'authID':authId},
        {$set: user }
    )
    return updatedUser
 }


 export const getUserName = async (authId:string)=>{

  const userName = await User.find({ authID: authId }, {  name: 1 });
  
  return userName

 }
 