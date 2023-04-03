import {User} from "../schema/user-schema"

export async function createUser(user: object) {
    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

export async function checkLoginEmail(loginEmail:String) {
    return await await User.find({'loginEmail':loginEmail})
}
