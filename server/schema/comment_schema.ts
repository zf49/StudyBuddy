import mongoose from "mongoose";
import { Schema, model, Document, Types } from 'mongoose';
import { IQuestion } from "./question_schema";
import { IReply } from "./reply_schema";


export interface IComment extends Document {
    questionId: Types.ObjectId | IQuestion;
    authorId: string;
    content: string;
    parentId: Types.ObjectId | IComment | null;
    replies: Types.ObjectId[] | IReply[];
    createdAt: Date;
    updatedAt: Date;
  }


  const commentSchema = new Schema<IComment>({
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    replies: [{
      type: Schema.Types.ObjectId,
      ref: 'Reply',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

const Comment = mongoose.model("Comment", commentSchema)

export { Comment }