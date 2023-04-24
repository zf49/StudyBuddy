
import {User} from "../schema/user-schema"

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
        //   { courses: { $regex: keyword, $options: "i" } },
        ]
      }).sort({name:1}).collation( { locale: 'en', strength: 2 } )
}

export async function checkAuthID(authID:String) {
    return await User.find({'authID':authID})
}

export const getUserProfile = async (authId:string)=>{
   const userProfile =  await User.find({'authID':authId})
   return userProfile
}


export const updateUserProfile = async (authId:string,user:object)=>{
    const updatedUser = await User.updateOne(
        {'authID':authId},
        {$set: user }
    )
    return updatedUser
 }
 