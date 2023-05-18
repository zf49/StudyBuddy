import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, Box, } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios'
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArticleIcon from '@mui/icons-material/Article';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormDialog from './MyQuestionDialog';
import { ICourse } from '../Profile/Course';
import { useAuth0 } from '@auth0/auth0-react';
import { IQuestion } from './Home';

export interface IPostQuestion {
    title:string, content:string, semester:string, course:string,authId:string|undefined,
}


interface IProps{
    allQuestion:IQuestion[],
    setAllQuestion: React.Dispatch<React.SetStateAction<IQuestion[]>>,
    fetchAllQuestionsAndAuthor:()=>void

}


export default function FloatingButton(props:IProps) {
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };



    const {user} = useAuth0()

    const [flag, setFlag] = useState(false)

    const handleMyQuestion = ()=>{

        setFlag(true)

        const filteredQuestions = props.allQuestion.filter(question => question.authorId === user?.sub);
        // console.log(filteredQuestions)
        props.setAllQuestion(filteredQuestions)
        handleButtonClose()
    }

    const handleAllQuestion = ()=>{
        setFlag(false)
        props.fetchAllQuestionsAndAuthor()
        handleButtonClose()
    }



    const handleButtonClose = () => {

        setAnchorEl(null);
    };

    const [openPost, setOpenPost] = React.useState(false);

    const handlePostClickOpen = () => {
        setOpenPost(true);
    };

    const handlePostClose = () => {
        setOpenPost(false);
    };


    const [courses, setcourses] = useState<ICourse[]>([])

    useEffect(() => {

        const setCourse = async ()=>{

            const token = await getAccessTokenSilently()

            axios.get('http://localhost:8080/courses',{headers: {Authorization: `Bearer ${token}`}}).then((res) => {
            setcourses(res.data)
        })
        }
        setCourse()
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

       const {getAccessTokenSilently} = useAuth0()


    const postQuestion = async () => {
        const question:IPostQuestion = {
            "title":title,
            "semester":semester,
            "content":content,
            "course":course,
            "authId":user?.sub
        }
        console.log(question)

        const token = await getAccessTokenSilently()

        axios.post('http://localhost:8080/question/postquestion',question,{headers: {Authorization: `Bearer ${token}`}}).then((res)=>{
            props.setAllQuestion(res.data.data)
        })
        handlePostClose()
    }

    return (
        <div>
            <Fab
              
                style={{
                    position: 'fixed',
                    bottom: 50,
                    right: 30,
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
                {!flag?<MenuItem onClick={handleMyQuestion}>
                    <IconButton size="large" color="inherit">
                        <RateReviewIcon />
                    </IconButton>
                    <p>My Question</p>
                </MenuItem>:<MenuItem onClick={handleAllQuestion}>
                    <IconButton size="large" color="inherit">
                        <ArticleIcon />
                    </IconButton>
                    <p>All Question</p>
                </MenuItem>}

                {/* <MenuItem onClick={handleButtonClose}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem> */}
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
