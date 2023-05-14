import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, Box, } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios'
import RateReviewIcon from '@mui/icons-material/RateReview';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormDialog from './FormDialog';
import { ICourse } from '../Profile/Course';
import { useAuth0 } from '@auth0/auth0-react';

export interface IPostQuestion {
    title:string, content:string, semester:string, course:string,authId:string|undefined
}




export default function FloatingButton() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleButtonClose = () => {
        console.log('adasd')
        setAnchorEl(null);
    };
        const {user} = useAuth0()

    const [openPost, setOpenPost] = React.useState(false);

    const handlePostClickOpen = () => {
        setOpenPost(true);
    };

    const handlePostClose = () => {
        setOpenPost(false);
    };


    const [courses, setcourses] = useState<ICourse[]>([])

    useEffect(() => {
        axios.get('http://localhost:8080/courses').then((res) => {
            setcourses(res.data)
        })

    }, [])


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
      };
    
      const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
      };
    
      const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSemester(event.target.value);
      };
    
      const handleCourseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourse(event.target.value);
      };

    const postQuestion = () => {
        const question:IPostQuestion = {
            "title":title,
            "semester":semester,
            "content":content,
            "course":course,
            "authId":user?.sub
        }
        console.log(question)
        axios.post('http://localhost:8080/question/postquestion',question)
        handlePostClose()
    }

    return (
        <div>
            <Fab
                style={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
                color="secondary"
                aria-label="add"
                onClick={handleClick}
            >
                <UpIcon />
            </Fab>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleButtonClose}
            >
                <MenuItem onClick={handlePostClickOpen}>
                    <IconButton size="large" color="inherit">

                        <CreateIcon />
                    </IconButton>
                    <p>Post Question</p>
                </MenuItem>
                <MenuItem onClick={handleButtonClose}>
                    <IconButton size="large" color="inherit">
                        <RateReviewIcon />
                    </IconButton>
                    <p>My Question</p>
                </MenuItem>

                <MenuItem onClick={handleButtonClose}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
            </Menu>

             <div>

                <Dialog open={openPost} onClose={handlePostClose}>
                    <DialogTitle>Post New Question</DialogTitle>
                    <DialogContent>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                variant="standard"
                                onChange={handleTitleChange}

                            />
                        </Box>
                    </DialogContent>
                    <DialogContent>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField
                                id="content"
                                fullWidth
                                label="Content"
                                multiline
                                rows={4}
                                onChange={handleContentChange}

                            />
                        </Box>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            fullWidth
                            id="semester"
                            select
                            label="Semester"
                            helperText="Please select your Semester"
                            onChange={handleSemesterChange}

                        >
                            <MenuItem value="Semester 1">Semester 1</MenuItem>
                            <MenuItem value="Semester 2">Semester 2</MenuItem>
                            <MenuItem value="Summer School">Summer School</MenuItem>
                            <MenuItem value="Later Year">Later Year</MenuItem>
                        </TextField>
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            fullWidth
                            id="course"
                            select
                            label="Course"
                            helperText="Please select your Courses"
                            onChange={handleCourseChange}

                        >
                            {courses.map((item, index) => {
                                return <MenuItem key={index} value={item.CourseNName}>{item.CourseNName}</MenuItem>
                            })}
                        </TextField>
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handlePostClose}>Cancel</Button>
                        <Button onClick={postQuestion}>Post</Button>
                    </DialogActions>
                </Dialog>
            </div> 


        </div>
    )
}
