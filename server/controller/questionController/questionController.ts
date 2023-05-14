import { addQuestion, getAllQuestion } from "../../dao/question-dao";

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

        res.status(201).json({ success: true, data: addQues });

      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'err' });
      }

}