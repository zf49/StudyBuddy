import { IQuestion, Question } from "../schema/question_schema";
import {Types } from 'mongoose';
import { ObjectId } from 'mongoose';
import { IComment } from "../schema/comment_schema";
import { postNewComment } from "./comment_dao";

export const getAllQuestion = async ()=>{

    const questions: IQuestion[] = await Question.find().populate('comments')

    return questions
}


export const getQuestionById = async (questionId:string)=>{

    const question: IQuestion | null = await Question.findById(new Types.ObjectId(questionId)).populate('comments');

        // console.log(question)

    return question
}


export const addQuestion = async (authorId:string,title:string,content:string,semester:string,course:string)=>{

    const question: IQuestion = new Question({
        authorId,
        title,
        content,
        semester,
        course
      });

      const postInfo = await question.save();

    return postInfo
}

export const addCommentToQuestion = async (comment:IComment,questionId:string) => {



    const question: IQuestion | null = await Question.findByIdAndUpdate(
        questionId,
        { $push: { comments: comment } },
        { new: true }
      );


        

    return question;    
};