import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ICourse {
    course_code: string,
    course_name: string,
    CourseNName: string
    // course_semester: string
    // course_year: number
    // course_display_name: string
}

// each year the course dates change
// therefore the course database will create a new course
// Separate documents in database
// e.g. 
// - CS732 S1 2023
// - CS732 S2 2024


const courseSchema = new Schema<ICourse>({
    course_code: { type: String, required: true },
    course_name: { type: String, required: true },
    CourseNName: { type: String, required: true },
    // course_display_name: { type: String, required: true }

})

const Course = mongoose.model("Course", courseSchema)

export { Course }