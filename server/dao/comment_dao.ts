

import { IComment, Comment } from "../schema/comment_schema";

import {Types } from 'mongoose';
import { ObjectId } from 'mongoose';
import { IQuestion } from "../schema/question_schema";

export const getAllComment = async ()=>{

    const allComment = await Comment.find()

    return allComment
}


export const postNewComment = async (authorId:string,content:string,questionId:Types.ObjectId)=>{

    const comment: IComment = new Comment({
        authorId,
        questionId,
        content
      });
      const postComment = await comment.save();

      return postComment

}

