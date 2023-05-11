var express = require('express');
var router = express.Router();




router.get('/getreply', async (req, res) => {

    res.send('test_reply')

});



module.exports = router;
