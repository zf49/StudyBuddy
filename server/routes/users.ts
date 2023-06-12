var express = require('express');
var router = express.Router();
import Joi from 'joi';
import { checkAuthID, createUser, getUserProfile, searchUser, updateUserProfile } from '../dao/user-dao'
import { IUser } from '../schema/user-schema';
import { getUserByID, userRecommand} from './../controller/userController'

const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
import jwtDecode, { JwtPayload } from "jwt-decode";






const HTTP_CREATED = 201;



const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;


// get search user result
router.post('/:keyword', async (req, res) => {
 
  const keywordValidate = Joi.string().required().validate(req.params.keyword)
  
  if (keywordValidate.error) {

    console.error(keywordValidate.error)
  } else {
    const userResult = await searchUser(keywordValidate.value)
    res.json(userResult)
  }
})


// update userProfile
router.patch('/profile/:authID', async (req, res, next) => {
  const authIDValidate = Joi.string().required().validate(req.params.authID)
  if (authIDValidate.error) {
    console.error(authIDValidate.error)
  } else {
    const userDataValidate = Joi.object<IUser>({
      name: Joi.string().required(),
      uniID: Joi.string().required(),
      gender: Joi.string().required().allow(null, ''),
      email: Joi.string().required().allow(null, ''),
      faculty: Joi.string().required().allow(null, ''),
      major: Joi.string().required().allow(null, ''),
      authID: Joi.string().required(),
      userAvatar: Joi.string().required(),
      semester: Joi.string().required(),
      courses: Joi.array().items(
        Joi.object({
          course_code: Joi.string().required(),
          course_name: Joi.string().required(),
          CourseNName: Joi.string().required()
        }).unknown(true)
      ).required().allow(null, '')
    }).unknown(true).validate(req.body)
    if (userDataValidate.error) {
      console.error(userDataValidate.error)
    } else {
      const updatedUser = await updateUserProfile(authIDValidate.value, userDataValidate.value)
      res.json(updatedUser);
    }
  }
});

  router.post('/api/getUserProfile',getUserByID)



// set pic
// router.patch('/:authID/pic',async (req, res, next) => {
//   res.json('aaaaaaaaaa');
// });

/* GET users listing. */
router.get('/:uniID', async (req, res, next) => {

  const uniIDValidate = Joi.string().required().validate(req.params.uniID)
  if (uniIDValidate.error) {
    console.error(uniIDValidate.error)
  } else {
    const user = await getUserProfile(uniIDValidate.value)

    console.log('user',user)
    res.json(user);
  }
});


// Get users login Email
router.get('/authID/:authID',async (req, res) => {

  const authIDValidate = Joi.string().required().validate(req.params.authID)

  console.log(authIDValidate.value,"123123123123")

  if (authIDValidate.error) {
    console.error(authIDValidate.error)
  } else {
    const isHave: object = await checkAuthID(authIDValidate.value);
    res.send(isHave)
  }

});

// user recommend
router.post("/api/recomand",userRecommand)

// router.post("/api/recommendations/:page",spiltpage)

// sign up
router.post("/api/register", async (req, res) => {
  try {
    const userDataValidate = Joi.object<IUser>({
      name: Joi.string().required(),
      uniID: Joi.string().required(),
      gender: Joi.string().required().allow(null, ''),
      email: Joi.string().required().allow(null, ''),
      faculty: Joi.string().required().allow(null, ''),
      major: Joi.string().required().allow(null, ''),
      authID: Joi.string().required(),
      // semester: Joi.string().required(),
      userAvatar: Joi.string().required(),
    }).validate(req.body)
    if (userDataValidate.error) {
      console.error(userDataValidate.error)
    } else {
      const newUser = await createUser(userDataValidate.value)
      res.sendStatus(HTTP_CREATED)
      console.log(newUser)
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(HTTP_BAD_REQUEST)
  }
})

module.exports = router;
