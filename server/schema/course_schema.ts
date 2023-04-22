import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ICourse {
    course_code: string,
    course_name: string,
    CourseNName: string
}


const courseSchema = new Schema<ICourse>({
    course_code: { type: String, required: true },
    course_name: { type: String, required: true },
    CourseNName: { type: String, required: true }

})

const Course = mongoose.model("Course", courseSchema)

export { Course }