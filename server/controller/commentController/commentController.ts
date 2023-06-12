import { addCommentToQuestion, getAllQuestion, getQuestionById } from "../../dao/question-dao"
import { IComment } from "../../schema/comment_schema"
import { IQuestion } from "../../schema/question_schema"

import {  postNewComment } from "../../dao/comment_dao";
import { Types } from 'mongoose';
import { ObjectId } from 'mongoose';
import { checkAllQuestion } from "../questionController/questionController";



export const postComment = async(req,res)=>{

    console.log(req.body)
    const {comment,questionId,comment_author_id} = req.body

    // get Question by id

    // create a new comment
    const addComment = await postNewComment(comment_author_id, comment,  new Types.ObjectId(questionId))

    const updatedQuestion = await addCommentToQuestion(addComment,questionId)

    const question: IQuestion = await getQuestionById(questionId)

    const allQuestions:IQuestion[] =  await getAllQuestion();


    res.json(allQuestions)

}