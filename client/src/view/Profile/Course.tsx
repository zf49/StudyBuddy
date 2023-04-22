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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
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
    CodeNName: string
}


export default function Course() {
    
    const [courseName, setCourseName] = useState<ICourse[]>()

    useEffect(() => {
       axios.get('http://localhost:8080/courses').then((res)=>{
           setCourseName(res.data)
       })
    }, [])

    const [courseShow, setCourseShow] = useState<string[]>([])

    const handleChange = (e: SelectChangeEvent<string[]>) => {
      const selectedValues = e.target.value as string[];
      setCourseShow(selectedValues);
    };

    
  return (
    <>
      {console.log(courseShow)}
    <div>
      <FormControl style={{'width':'100%',marginTop:'10px'}}>
        <InputLabel id="demo-multiple-checkbox-label">Course</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={courseShow}
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
          {courseName?.map((item,index) => (
            <MenuItem key={index} value={item.CodeNName} >
              <Checkbox checked={courseShow.indexOf(item.CodeNName) > -1} />
              <ListItemText primary={item.CodeNName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    </>
  );
}