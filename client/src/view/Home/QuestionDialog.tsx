import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { IQuestion } from './Home';
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
import { useAuth0 } from '@auth0/auth0-react';
import { Dispatch, SetStateAction } from 'react';


type Props = {
  open: boolean;
  close: () => void;
  question: IQuestion;
  setAllQuestion: Dispatch<SetStateAction<IQuestion[]>>;
  setQuestion:Dispatch<SetStateAction<IQuestion>>
};



const QuestionDialog: React.FC<Props> = ({ open, close, question,setAllQuestion ,setQuestion}) => {


  const handleClose = () => {
    close();
  };

  const [comment, setComment] = useState("") 

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
};

const {user} = useAuth0()

  const makeComment = (questionId:string)=>{
    const postComment = {
        "comment":comment,
        "questionId":questionId,
        "comment_author_id":user?.sub
    }
    // console.log(postComment)
  //TODO:post to backend
   axios.post("http://localhost:8080/comment/postcomment", postComment)
  .then((res) => {
    setAllQuestion(res.data)
      res.data.map((item:IQuestion)=>{
        if(item._id === question._id){
          setQuestion(item)
        }
      })
  });
  }

  return (
       <div>
                                <Dialog
                                    fullScreen
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <AppBar sx={{ position: 'relative' }}>
                                        <Toolbar>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={handleClose}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                {question.title}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <Paper>
                                    <h1>{question.content}</h1>
                                    <p>{question.authorName}</p>
                                    <p>{new Date(question.createdAt).toLocaleString()}</p>
                                    </Paper>
                                    <div style={{ textAlign: 'center' }}>
                                    <Paper elevation={3} sx={{ marginTop: '1em' }}>
                                        <TextField
                                        id="filled-textarea"
                                        label="Comment"
                                        multiline
                                        variant="filled"
                                        fullWidth
                                        onChange={handleCommentChange}
                                        />
                                        <Button sx={{width:'80%'}} onClick={()=>makeComment(question._id)}>Submit</Button>
                                    </Paper>
                                    <div>{question.comments.map((comment)=>{
                                      return <Paper>
                                        <p>{comment.content}</p>
                                        <p>{new Date(comment.createdAt).toLocaleString()}</p>
                                      </Paper>
                                    })}</div>

                                    </div>
                                </Dialog>
                            </div> 
  );
};

export default QuestionDialog;
