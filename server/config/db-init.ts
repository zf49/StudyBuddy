import { IUser, User } from "../schema/user-schema";
import dummyUsers from "../db/user.json"
import dummyMajors from "../db/f&m.json"
import dummyCourse from "../db/courses.json"
import { IMajor, Major } from "../schema/major-schema";
import { Course } from "../schema/course_schema";
import { ICourse } from "../schema/course_schema";



export async function initUserData() {
    if(await User.count() == 0){
        dummyUsers.map(async (user: IUser) => {
            const dummyUser = new User(user)
            await dummyUser.save()
    })
    }
}

export async function initMajorData() {
    if(await Major.count() == 0){
        dummyMajors.map(async (major: IMajor) => {
            const dummyMajor = new Major(major)
            await dummyMajor.save()
    })
    }
}

export async function initCourseData() {
    if(await Course.count() == 0){
        dummyCourse.map(async (course: ICourse) => {
            const dummyCourse = new Course(course)
            await dummyCourse.save()
        })
    }
}