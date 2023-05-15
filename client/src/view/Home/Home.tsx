import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, TextField, } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios'
import RateReviewIcon from '@mui/icons-material/RateReview';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
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
}

export interface IComment {
    questionId: string;
    authorId: string;
    content: string;
    parentId: string;
    replies: IReply[];
    createdAt: Date;
    updatedAt: Date;
    _id:string;
}


export interface IReply  {
    commentId: IComment;
    authorId: string;
    content: string;
    parentId: IReply | null;
    createdAt: Date;
    updatedAt: Date;
  }

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {


    const [allQuestion, setAllQuestion] = useState<IQuestion[]>([]);


    const fetchAllQuestionsAndAuthor = () => {
        axios.get('http://localhost:8080/question/allQuestion').then((res) => {
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
    });
    const handleClickOpen = async (item: IQuestion) => {
        await axios.post('http://localhost:8080/users/api/getUserProfile', {
            "authID": item.authorId
        }).then((res) => {
            console.log('asdasda', res.data.name)
            setQuestion({ ...item, authorName: res.data.name });
            setOpen(true);
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper style={{ padding: 8 }}>
                        <h1>Home</h1>
                        <p>lormasdasd</p>
                    </Paper>
                </Grid>
                {allQuestion.map((item) => (
                    <Grid item xs={12} key={item._id} onClick={() => handleClickOpen(item)}>
                        <Paper style={{ padding: 8 }}>
                            <h1>{item.title}</h1>
                            <p>{item.content}</p>
                        </Paper>
                    </Grid>
                ))}
                <FloatingButton />
            </Grid>
            <QuestionDialog open={open} close={handleClose} question={question} setQuestion={setQuestion} setAllQuestion={setAllQuestion} />
        </div>

    );
};

export default Home;


