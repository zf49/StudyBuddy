import mongoose, { Schema, Document, Types } from "mongoose";
import { IComment } from './comment_schema'

export interface IQuestion extends Document {
    authorId: string;
    title: string;
    content: string;
    comments: Types.ObjectId[] | IComment[];
    createdAt: Date;
    updatedAt: Date;
    semester:string;
    course:string;
}

const questionSchema = new Schema<IQuestion>({
    authorId: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
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

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export { Question };
