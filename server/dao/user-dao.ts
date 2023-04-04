import {User} from "../schema/user-schema"

export async function createUser(user: object) {
    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

export async function checkLoginEmail(authID:String) {
    return await User.find({'authID':authID})
}


export const getUserProfile = async (uniId:string)=>{
   const userProfile =  await User.find({'uniID':uniId})
   
   return userProfile

}
