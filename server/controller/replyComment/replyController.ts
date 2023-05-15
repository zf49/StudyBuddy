import { getAllQuestion } from "../../dao/question-dao"
import { addNewReply, addReplyToComment } from "../../dao/reply_dao"
import { IQuestion } from "../../schema/question_schema"
import { IReply } from "../../schema/reply_schema"



export const postNewReply = async(req,res)=>{

    const {commentID,authorId,content} = req.body
           const reply:IReply = await addNewReply(commentID,content,authorId)
           const comment = await addReplyToComment(reply,commentID)
           console.log('newcomment',comment)
           const allQuestions:IQuestion[] =  await getAllQuestion();

           res.json(allQuestions)
    
 }

