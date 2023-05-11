import { IQuestion, Question } from "../schema/question_schema";

export const getAllQuestion = async ()=>{

    const questions: IQuestion[] = await Question.find();



    return questions
}




export const addQuestion = async (authorId:string,title:string,content:string)=>{

    const question: IQuestion = new Question({
        authorId,
        title,
        content
      });

      const postInfo = await question.save();

    return postInfo
}