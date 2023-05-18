import { getCourses } from "../dao/course_dao";
import { ICourse } from "../schema/course_schema";

var express = require('express');
var router = express.Router();


// get search user result
router.get('/', async (req,res)=>{ 

    const course:ICourse[] = await getCourses()
    res.json(course)
})


module.exports = router;
