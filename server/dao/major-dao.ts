import { Major } from "../schema/major-schema";


export async function retriveMajors() {
    return await Major.find({});
}

export async function retriveFaculties() {
    return await Major.find().select("faculty").distinct("faculty");
}
