import { postNewReply } from "../controller/replyComment/replyController";

var express = require('express');
var router = express.Router();




router.get('/getreply', async (req, res) => {
    res.send('test_reply')
});

router.post('/postNewReply', postNewReply);





module.exports = router;
