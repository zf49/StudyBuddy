import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Chip, InputLabel, OutlinedInput, } from '@mui/material';

import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';

import FloatingButton from './FloatingButton';
import { useAuth0 } from '@auth0/auth0-react';
import QuestionDialog from './QuestionDialog';
import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import NewQuestionDialog from './NewQuestionDialog';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NewspaperIcon from '@mui/icons-material/Newspaper';
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

    const { user, getAccessTokenSilently } = useAuth0()

    const [allQuestion, setAllQuestion] = useState<IQuestion[]>([]);
    const [allQuestionFlag, setAllQuestionFlag] = useState<IQuestion[]>([]);




    const fetchAllQuestionsAndAuthor = async () => {
        const token = await getAccessTokenSilently()

        axios.get('http://localhost:8080/question/allQuestion', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
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
            "authID": item.authorId
        },
            {
                headers: { Authorization: `Bearer ${token}` }

            }).then((res) => {
                console.log('asdasda', res.data.name)
                setQuestion({ ...item, authorName: res.data.name });
                setOpen(true);
            })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [flag, setFlag] = useState(false)

    const filterMyQuestion = ()=>{
        setFlag(true)

        const filteredQuestions = allQuestion.filter(question => question.authorId === user?.sub);
        // console.log(filteredQuestions)
        setAllQuestion(filteredQuestions)
        // handleButtonClose()
    }

    const handleAllQuestion = ()=>{
        setFlag(false)
        fetchAllQuestionsAndAuthor()
        
    }


    const deleteQuestion = async (questionId: string) => {
        console.log(questionId)
        const token = await getAccessTokenSilently()
        axios.delete(`http://localhost:8080/question/deletequestion/${questionId}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            setAllQuestion(res.data)
            setFlag(false)
        })
    }
    const [showDialog, setShowDialog] = useState(false);
    const handleButtonDialogClick = () => {
        setShowDialog(true);
    };

    return (
        <div style={{ marginBottom: '1em' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Paper style={{ position: 'relative', padding: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={handleButtonDialogClick}
              style={{ marginRight: 8 }}
              sx={{
                borderRadius: "1em",
                textTransform: "none",
                '&:hover': {
                    bgcolor: "primary.dark",
                    color:'white',
                    transition: "0.3s",
                }
            }}
            >
              Post new Question
            </Button>

            {!flag?<Button
              variant="outlined"
              startIcon={<AssignmentIcon />}
              onClick={filterMyQuestion}
              style={{ marginLeft: 8 }}
              sx={{
                borderRadius: "1em",
                textTransform: "none",
                '&:hover': {
                    bgcolor: "primary.dark",
                    color:'white',
                    transition: "0.3s",
                }
            }}
            >
              My Question
            </Button>:<Button
              variant="outlined"
              startIcon={<NewspaperIcon />}
              onClick={handleAllQuestion}
              style={{ marginLeft: 8 }}
              sx={{
                borderRadius: "1em",
                textTransform: "none",
                '&:hover': {
                    bgcolor: "primary.dark",
                    color:'white',
                    transition: "0.3s",
                }
            }}
            >
              All Question
            </Button>}



          </div>

          <NewQuestionDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            allQuestion={allQuestion}
            setAllQuestion={setAllQuestion}
            fetchAllQuestionsAndAuthor={fetchAllQuestionsAndAuthor}
          />
        </Paper>
                </Grid>



                {allQuestion.map((item) => (
                    <Grid item xs={12} key={item._id}>
                        <Paper style={{ position: 'relative', padding: 8 }}>
                            <div onClick={() => handleClickOpen(item)} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: 16, wordBreak: 'break-word' }}>
                                    <h1 style={{ margin: 0 }}>{item.title}</h1>
                                    {item.semester ? <Chip label={item.semester} style={{ marginTop: 8, fontSize: '0.4em', height: '2em', borderRadius: '1em' }} /> : null}
                                    {item.course ? <Chip label={item.course} style={{ marginTop: 8, fontSize: '0.4em', height: '2em', borderRadius: '1em' }} /> : null}
                                </div>
                            </div>
                            <h3 style={{ wordBreak: 'break-word' }}>{item.content}</h3>
                            <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                {item.authorId === user?.sub ? <Button color="error" onClick={() => deleteQuestion(item._id)} ><DeleteOutlineIcon /></Button> : null}
                            </div>
                        </Paper>
                    </Grid>

                ))}
                {/* <FloatingButton allQuestion={allQuestion} setAllQuestion={setAllQuestion} fetchAllQuestionsAndAuthor={fetchAllQuestionsAndAuthor} /> */}
            </Grid>
            <QuestionDialog open={open} close={handleClose} question={question} setQuestion={setQuestion} setAllQuestion={setAllQuestion} />
        </div>

    );
};

export default Home;


