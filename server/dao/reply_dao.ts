

import {Types } from 'mongoose';
import { ObjectId } from 'mongoose';
import { Comment, IComment } from '../schema/comment_schema';
import { IReply, Reply } from '../schema/reply_schema';


export const addNewReply = async (commentId:string,content:string,authorId:string)=>{

    const reply:IReply = new Reply({
        commentId:new Types.ObjectId(commentId),
        content:content,
        authorId:authorId
      });


      console.log('reply',reply)
      const postReply = await reply.save();

      
      return reply
    }



    export const addReplyToComment = async (reply:IReply,commentId:string) => {


        const comment: IComment | null = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { replies: reply } },
            { new: true }
          );
        return comment;    
    };
