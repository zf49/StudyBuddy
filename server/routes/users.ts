var express = require('express');
var router = express.Router();
import {createUser} from '../dao/user-dao'

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/register/", async (req, res) => {
  try {
    const user: {
      name: string,
      uniID: number,
      gender: string,
      email: string,
      faculty: string,
      major: string,
    } = {
      name: req.body.name,
      uniID: req.body.uniID,
      gender: req.body.gender,
      email: req.body.email,
      faculty: req.body.faculty,
      major: req.body.major
    }

    if(user.name && user.uniID){
      const newUser = await createUser(user)
      res.sendStatus(HTTP_CREATED)
    }else{
      res.json("User name or UniID cannot be empty!")
    }
  } catch {
    res.sendStatus(HTTP_BAD_REQUEST)
  }
})

module.exports = router;
