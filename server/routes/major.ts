var express = require('express');
var router = express.Router();
import { retriveFaculties, retriveMajors } from '../dao/major-dao';
import {createUser} from '../dao/user-dao'

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;


router.get('/', async (req, res) => {
    try{
  const faculties: object = await retriveFaculties();
  const majors: object = await retriveMajors();
  res.send({faculties: faculties, majors: majors})
    }catch {
        
    }
});



module.exports = router;
