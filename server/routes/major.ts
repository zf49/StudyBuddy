var express = require('express');
var router = express.Router();
import { retriveFaculties, retriveMajors } from '../dao/major-dao';
import { createUser } from '../dao/user-dao'
import { IMajor } from '../schema/major-schema';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;


router.get('/', async (req, res) => {
  try {
    const faculties: string[] = await retriveFaculties();
    const majors: IMajor[] = await retriveMajors();
    const data: {
      faculties: string[],
      majors: IMajor[]
    } = { faculties: faculties, majors: majors }
    res.json(data)
  } catch {

  }

});


module.exports = router;
