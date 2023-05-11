var express = require('express');
var router = express.Router();


router.get('/getcomment', async (req, res) => {

    res.send('test_comment')

});



module.exports = router;
