var express = require('express');
var router = express.Router();

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;


router.get('/allQuestion', async (req, res) => {


 
    res.send('test_question')

});



module.exports = router;
