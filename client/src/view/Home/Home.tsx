import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, TextField, Chip, } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios'
import RateReviewIcon from '@mui/icons-material/RateReview';

import Button from '@mui/material/Button';

import FloatingButton from './FloatingButton';
import { useAuth0 } from '@auth0/auth0-react';
import QuestionDialog from './QuestionDialog';



export interface IQuestion {
    _id: string;
    authorId: string;
    authorName: string;
    title: string;
    content: string;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
    semester: string;
    course: string;
}

export interface IComment {
    questionId: string;
    authorId: string;
    content: string;
    parentId: string;
    replies: IReply[];
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}


export interface IReply {
    commentId: IComment;
    authorId: string;
    content: string;
    parentId: IReply | null;
    createdAt: Date;
    updatedAt: Date;
}

const Home = () => {

    const { user,getAccessTokenSilently } = useAuth0()

    const [allQuestion, setAllQuestion] = useState<IQuestion[]>([]);
    const [allQuestionFlag, setAllQuestionFlag] = useState<IQuestion[]>([]);

    


    const fetchAllQuestionsAndAuthor = async () => {
        const token = await getAccessTokenSilently()

        axios.get('http://localhost:8080/question/allQuestion',{headers: {Authorization: `Bearer ${token}`}}).then((res) => {
            console.log(res.data)
            setAllQuestion(res.data)
        })
    }

    useEffect(() => {
        fetchAllQuestionsAndAuthor();
    }, [])



    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = useState<IQuestion>({
        _id: '',
        authorId: '',
        authorName: '',
        title: '',
        content: '',
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        semester: '',
        course: ''
    });


   
    const handleClickOpen = async (item: IQuestion) => {
        const token = await getAccessTokenSilently()

        await axios.post('http://localhost:8080/users/api/getUserProfile', {
            "authID": item.authorId,
            headers: {Authorization: `Bearer ${token}`},

            }).then((res) => {
            console.log('asdasda', res.data.name)
            setQuestion({ ...item, authorName: res.data.name });
            setOpen(true);
        })
    };

    const handleClose = () => {
        setOpen(false);
    };


    const deleteQuestion = async (questionId:string)=>{
        console.log(questionId)
        const token = await getAccessTokenSilently()
        axios.delete(`http://localhost:8080/question/deletequestion/${questionId}`,{headers: {Authorization: `Bearer ${token}`}}).then((res)=>{
            setAllQuestion(res.data)
        })
    }



    return (
        <div style={{ marginBottom: '1em' }}>
            <Grid container spacing={2}>
                {allQuestion.map((item) => (
                    <Grid item xs={12} key={item._id} >
                        <Paper style={{ position: 'relative', padding: 8 }}>
                            <div onClick={() => handleClickOpen(item)}>
                                <h1 style={{ display: 'inline-block', marginRight: 16 }}>{item.title}</h1>
                                {item.semester ? <Chip label={item.semester} style={{ float: 'right' }} /> : null}
                                {item.course ? <Chip label={item.course} style={{ float: 'right', marginRight: 8 }} /> : null}
                            </div>
                            <h3>{item.content}</h3>
                            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                {item.authorId === user?.sub ? <Button onClick={()=>deleteQuestion(item._id)}>Delete</Button> : null}
                            </div>
                        </Paper>
                        
                    </Grid>
                ))}
                <FloatingButton allQuestion={allQuestion} setAllQuestion={setAllQuestion} fetchAllQuestionsAndAuthor={fetchAllQuestionsAndAuthor} />
            </Grid>
            <QuestionDialog open={open} close={handleClose} question={question} setQuestion={setQuestion} setAllQuestion={setAllQuestion} />
        </div>

    );
};

export default Home;


