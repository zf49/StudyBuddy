import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUserDetail } from '../Profile/Profile';
import { ICourse } from '../Profile/Course';
import { useState,useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { Checkbox } from '@mui/material';
interface IFilterList{
    open:boolean,
    handleClickOpen:()=>void,
    handleClose:()=>void,
    users:IUserDetail[],
    onSubmit: (selectedCourses: string[]) => void
    onSelectedCoursesChange:(selectedCourses: string[])=>void
}

export default function ResultFilter(props:IFilterList) {


  const [filterList, setFilterList] = useState<string[]>([])
  const [open, setOpen] = React.useState(true);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
      console.log(props.users)
      const coursesSet = new Set<string>(); 
      props.users.forEach((userDetail: IUserDetail) => {
        userDetail.courses.forEach((course: ICourse) => {
          coursesSet.add(course.CourseNName); 
        });
      });
      const uniqueCourses = Array.from(coursesSet); 
      console.log(uniqueCourses);
      setFilterList(uniqueCourses)
  }, [props.users])

  const handleCourseSelect = (course: string) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  }

  const handleApply = () => {
    props.onSubmit(selectedCourses);
    props.handleClose();
    props.onSelectedCoursesChange(selectedCourses);
    console.log(selectedCourses)
  }

  const handleKeyDown =  (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key==='Enter'){
    props.onSubmit(selectedCourses);
    props.handleClose();
    props.onSelectedCoursesChange(selectedCourses);
    console.log(selectedCourses)
    }
};

  return (
    <div onKeyDown={handleKeyDown} >
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Filter List"}
        </DialogTitle>
        <DialogContent>
        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
            Choose your courses
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AutoStoriesIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {filterList?.map((item)=>{
            return  <ListItemButton sx={{ pl: 4 }} key={item}>
              <Checkbox
                checked={selectedCourses.includes(item)}
                onChange={() => handleCourseSelect(item)}
              /><ListItemText primary={item}  onClick={() => handleCourseSelect(item)}
              />
            </ListItemButton>
          })}
        </List>
      </Collapse>
    </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApply} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}