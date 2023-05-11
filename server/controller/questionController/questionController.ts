import { addQuestion, getAllQuestion } from "../../dao/question-dao";

export const checkAllQuestion = async(req,res)=>{

   const allQuestions =  await getAllQuestion();

   res.status(200).json({ success: true, data: allQuestions })
   
}




export const postQuestion = async(req,res)=>{

    const { authorId, title, content } = req.body;

    try {
        
        const addQues = await addQuestion(authorId,title,content)

        console.log(addQues)

        res.status(201).json({ success: true, data: addQues });

      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'err' });
      }

}