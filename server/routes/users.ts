var express = require('express');
var router = express.Router();
import {checkLoginEmail, createUser,getUserProfile} from '../dao/user-dao'

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;



/* GET users listing. */
router.get('/:uniID', async (req, res, next) => {

  const user = await getUserProfile(req.params.uniID)

  res.json(user);
});





// Get users login Email
router.get('/email/:address', async (req, res, next) => {
  const isHave: object = await checkLoginEmail(req.params.address);
  res.send(isHave)

});



router.post("/register", async (req, res) => {
  try {
    const user: {
      name: string,
      uniID: string,
      gender: string,
      email: string,
      faculty: string,
      major: string,
      authID:string,
    } = {
      name: req.body.name,
      uniID: req.body.uniID,
      gender: req.body.gender,
      email: req.body.email,
      faculty: req.body.faculty,
      major: req.body.major,
      authID: req.body.authID,
    }
    if(user.name && user.uniID){
      const newUser = await createUser(user)
      res.sendStatus(HTTP_CREATED)
    }else{
      res.json("User name or UniID cannot be empty!")
    }
  } catch(err) {
    console.log(err)
    res.sendStatus(HTTP_BAD_REQUEST)
  }
})

module.exports = router;
