import { useAuth0 } from '@auth0/auth0-react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import { IPostQuestion } from './FloatingButton';
import axios from 'axios'
import { ICourse } from '../Profile/Course';
import { IQuestion } from './Home';



export interface IProps{
    allQuestion:IQuestion[],
    setAllQuestion: React.Dispatch<React.SetStateAction<IQuestion[]>>,
    fetchAllQuestionsAndAuthor:()=>void,
    showDialog:boolean,
    setShowDialog:React.Dispatch<React.SetStateAction<boolean>>

}


export default function NewQuestionDialog(props:IProps) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');
    const [courses, setcourses] = useState<ICourse[]>([])
    const [message, setMessage] = React.useState<boolean>(false);

    const handlePostClose = () => {
        console.log('123')

        props.setShowDialog(false)
        // console.log('123')

    };

    useEffect(() => {

        const setCourse = async ()=>{

            const token = await getAccessTokenSilently()

            await axios.get('http://localhost:8080/courses',{headers: {Authorization: `Bearer ${token}`}}).then((res) => {
            setcourses(res.data)
        })
        }
        setCourse()
    }, [])

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

      const {user,getAccessTokenSilently} = useAuth0()



      const postQuestion = async () => {
        const question:IPostQuestion = {
            "title":title,
            "semester":semester,
            "content":content,
            "course":course,
            "authId":user?.sub
        }
        // console.log(question)

        
        const token = await getAccessTokenSilently()
        if(question.title && question.content){
        await axios.post('http://localhost:8080/question/postquestion',question,{headers: {Authorization: `Bearer ${token}`}}).then((res)=>{
            props.setAllQuestion(res.data.data)
        })
        handlePostClose()
    }else{
        setMessage(true)
    }
    }

    return (
        <div>

                <Dialog 
                open={props.showDialog}
                 onClose={handlePostClose}>
                    <DialogTitle>Post New Question</DialogTitle>
                    <div>
                        {message && <Alert severity="error">"All required fields must be filled in!"</Alert>}</div>
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
                        <Button onClick={()=>handlePostClose()}>Cancel</Button>
                        <Button onClick={postQuestion}>Post</Button>
                    </DialogActions>
                </Dialog>
            </div> 


    )
}
