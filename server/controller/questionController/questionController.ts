import { addQuestion, deleteQuestionById, getAllQuestion } from "../../dao/question-dao";
import { IQuestion } from "../../schema/question_schema";





export const checkAllQuestion = async(req,res)=>{

   const allQuestions =  await getAllQuestion();

   res.status(201).json(allQuestions)
   
}


export const postQuestion = async(req,res)=>{

    const { authId, title, content,course,semester } = req.body;

    console.log(authId, title, content,course,semester)

    try {
        
        const addQues = await addQuestion(authId, title, content,course,semester)

        console.log(addQues)
        const allQuestions:IQuestion[] =  await getAllQuestion();

        res.status(201).json({ success: true, data: allQuestions });

      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'err' });
      }

}


export const deleteQuestion = async (req,res)=>{

    // console.log('req.params',req.params.questionId)
  const questionId = req.params.questionId
    await deleteQuestionById(questionId)

    const allQuestions =  await getAllQuestion();

  res.json(allQuestions)

}