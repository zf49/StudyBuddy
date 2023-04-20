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
    course_name: string
}


export default function Course() {

    useEffect(() => {
       axios.get('http://localhost:8080/courses').then((res)=>{
           setCourseName(res.data)
           console.log(courseName)
       })
    }, [])


    const [courseName, setCourseName] = useState<ICourse[]>()


  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl style={{'width':'100%',marginTop:'10px'}}>
        <InputLabel id="demo-multiple-checkbox-label">Course</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
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
            <MenuItem value={item.course_code +": "+item.course_name}>
              <Checkbox checked={personName.indexOf(item.course_name) > -1} />
              <ListItemText primary={item.course_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}