var express = require('express');
var router = express.Router();
import { checkAllQuestion, deleteQuestion, postQuestion } from "../controller/questionController/questionController";



const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

router.get('/allQuestion', checkAllQuestion);

router.post('/postquestion',postQuestion)
router.delete('/deletequestion/:questionId',deleteQuestion)

module.exports = router;


