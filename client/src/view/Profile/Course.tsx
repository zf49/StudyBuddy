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


interface ICourseProps{
  selectedCourse:ICourse[],
  setCourse:(value: ICourse[])=>void
}

export default function Course(props:ICourseProps) {
    const classes = useStyles();

    const [courseName, setCourseName] = useState<ICourse[]>()
    const [courseToArrary, setcourseToArrary] = useState<string[]>([])
    const controller = new AbortController()


    useEffect(() => {
       axios.get('http://localhost:8080/courses', {signal: controller.signal}).then((res)=>{
           setCourseName(res.data)
       })

       // TODO: click update user courses
        const arr:string[] = []
        props.selectedCourse.map((item)=>{
          arr.push(item.CourseNName)
        })
        setcourseToArrary(arr)

        return () => {
          controller.abort()
        }

    }, [props.selectedCourse])


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
    
  return (
    <>
    <div style={{ width: '100%'}}>
      <FormControl style={{width:'100%',marginTop:'10px'}}>
        <InputLabel id="demo-multiple-checkbox-label">Course</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={courseToArrary}
          onChange={handleChange}
          input={<OutlinedInput label="Course" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value}  label={value} />
              ))}
            </Box>
          )}          
          MenuProps={MenuProps}
        >
          <div style={{'overflow':'auto'}}>
          {courseName?.map((item,index) => (
                  <MenuItem key={index} value={item.CourseNName} style={{width:'100%'}}>
                    <Checkbox checked={courseToArrary.includes(item.CourseNName)}/>
                    <ListItemText primary={item.CourseNName} />
                  </MenuItem>
          ))}
          </div>
        </Select>
      </FormControl>
    </div>
    </>
  );
}