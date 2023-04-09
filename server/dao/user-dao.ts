
import {User} from "../schema/user-schema"

export async function createUser(user: object) {
    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
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
 