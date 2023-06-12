import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Joi from 'joi';
import { Input } from '@mui/material';
import { StyledTextField } from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const useStyles = makeStyles((theme) => ({
  select: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export interface ICourse {
  course_code: string,
  course_name: string,
  CourseNName: string
}


interface ICourseProps {
  selectedCourse: ICourse[],
  setCourse: (value: ICourse[]) => void,
  selectedSemester:string,
  setSemester:(value:string) => void
}


export default function Course(props: ICourseProps) {

  const [courseName, setCourseName] = useState<ICourse[]>()
  const [courseToArrary, setcourseToArrary] = useState<string[]>([])
  const controller = new AbortController()


  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get('http://localhost:8080/courses', {
          signal: controller.signal,
          headers: { Authorization: `Bearer ${token}` },
        });

        const dbCourseValidate = Joi.array()
          .items(
            Joi.object<ICourse>({
              course_code: Joi.string().required(),
              course_name: Joi.string().required(),
              CourseNName: Joi.string().required(),
            }).unknown(true)
          ).validate(response.data);

        if (dbCourseValidate.error) {
          console.error(dbCourseValidate.error);
        } else {
          setCourseName(dbCourseValidate.value);
        }

        const arr: string[] = [];
        props.selectedCourse.map((item) => {
          arr.push(item.CourseNName);
        });
        setcourseToArrary(arr);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [props.selectedCourse]);

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const selectedValues = e.target.value as string[];
    setcourseToArrary(selectedValues);

    // convert string[] to iCourse[]
    const updatedSelectedCourses: ICourse[] = [];
    for (const course of courseName || []) {
      if (selectedValues.includes(course.CourseNName)) {
        updatedSelectedCourses.push(course);
      }
    }
    props.setCourse(updatedSelectedCourses);
  };

  const [semester, setSemester] = useState<string>('');

  const handleSemester = (semester:string) => {
    setSemester(semester);
    props.setSemester(semester)
    console.log(semester)
  };


  return (
    <>
      {console.log(currentMonth, currentDay)}
      <div>
        <FormControl style={{ 'width': '100%', marginTop: '10px' }}>

          <StyledTextField
            label="Semester"
            name="Semester"
            select
            value={props.selectedSemester}
            onChange={(e)=>handleSemester(e.target.value)}
            >
            <MenuItem value="Semester 1">Semester 1</MenuItem>
            <MenuItem value="Semester 2">Semester 2</MenuItem>
            <MenuItem value="Later Year">Later Year</MenuItem>
            <MenuItem value="Summer School">Summer School</MenuItem>
          </StyledTextField>

        </FormControl>
        <FormControl style={{ 'width': '100%' }}>
          <InputLabel id="demo-multiple-checkbox-label">Course</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={courseToArrary}
            onChange={handleChange}
            input={<OutlinedInput label="Course" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {courseName?.map((item, index) => (
              <MenuItem key={index} value={item.CourseNName} >
                <Checkbox checked={courseToArrary.includes(item.CourseNName)} />
                <ListItemText primary={item.CourseNName} />

              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
}