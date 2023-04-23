import { IUser, User } from "../schema/user-schema";
import dummyUsers from "../db/user.json"



export async function initUserData() {
    if(await User.count() == 0){
        dummyUsers.map(async (user: IUser) => {
            const dummyUser = new User(user)
            await dummyUser.save()
    })
    }
}