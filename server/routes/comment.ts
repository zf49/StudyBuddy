import { postComment } from "../controller/commentController/commentController";

var express = require('express');
var router = express.Router();


router.get('/getcomment', async (req, res) => {

    res.send('test_comment')

});




router.post('/postcomment', postComment);

module.exports = router;
