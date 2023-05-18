var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');

/* GET home page. */
router.get('/',requiresAuth(), function(req, res) {

  res.send(JSON.stringify(req.oidc.user));

});




module.exports = router;
