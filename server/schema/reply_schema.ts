import mongoose from "mongoose";
import { Schema, model, Document, Types } from 'mongoose';
import { IComment } from "./comment_schema";


export interface IReply extends Document {
    commentId: Types.ObjectId | IComment;
    authorId: string;
    content: string;
    parentId: Types.ObjectId | IReply | null;
    createdAt: Date;
    updatedAt: Date;
  }
  

const replySchema = new Schema<IReply>({
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
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
      ref: 'Reply',
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  

const Reply = mongoose.model("Reply", replySchema)

export { Reply }