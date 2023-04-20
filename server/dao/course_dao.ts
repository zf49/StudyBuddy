import { Course } from "../schema/course_schema";


export async function getCourses() {

    const allCourse = await Course.find({})

    return allCourse
}


