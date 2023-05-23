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
import ReplyDialog from './ReplyDialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

type Props = {
  open: boolean;
  close: () => void;
  question: IQuestion;
  setAllQuestion: Dispatch<SetStateAction<IQuestion[]>>;
  setQuestion: Dispatch<SetStateAction<IQuestion>>
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionDialog: React.FC<Props> = ({ open, close, question, setAllQuestion, setQuestion }) => {


  const handleClose = () => {
    close();
  };

  const [comment, setComment] = useState("")

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const { user, getAccessTokenSilently } = useAuth0()

  const [questionId, setQuestionId] = useState('')

  const makeComment = async (questionId: string) => {

    setQuestionId(questionId)
    const token = await getAccessTokenSilently()
    const postComment = {
      "comment": comment,
      "questionId": questionId,
      "comment_author_id": user?.sub
    }
    if (comment !== "") {
      //TODO:post to backend
      await axios.post("http://localhost:8080/comment/postcomment", postComment, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        setAllQuestion(res.data)
        res.data.map((item: IQuestion) => {
          if (item._id === question._id) {
            setQuestion(item)
          }
        })
      });

    }
    setComment("");
  }

  const [commentId, setCommentId] = useState('')


  const replyComment = (commentId: string) => {
    setCommentId(commentId)
    handleReplyOpen()
  }


  const [openReply, setOpenReply] = useState(false);

  const handleReplyOpen = () => setOpenReply(true);
  const handleReplyClose = () => setOpenReply(false);

  const handleSubmit = () => {
    handleReplyClose();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        aria-describedby="alert-dialog-slide-description"
        TransitionComponent={Transition}

        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1, wordBreak: 'break-word'}} variant="h6" component="div">
              {question.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper elevation={12} style={{ justifyContent: 'space-between'}}>
          <h3 style={{wordBreak: 'break-word',margin:'1em'}}>{question.content}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '10%', marginRight: '10em',marginTop:'0' }}>
            <p style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{"Author name: " + question.authorName + "  " + new Date(question.createdAt).toLocaleString()}</p>
          </div>
        </Paper>
        <div style={{ textAlign: 'center' }}>
          <Paper elevation={3} sx={{ marginTop: '1em' }}>
            <TextField
              id="filled-textarea"
              label="Comment"
              multiline
              variant="filled"
              fullWidth
              value={comment}
              onChange={handleCommentChange}
            />
            <Button sx={{ width: '80%' }} onClick={() => makeComment(question._id)}>Submit</Button>
          </Paper>
          <Divider />
          <div>{question.comments.map((comment) => {
            return <Paper elevation={12} sx={{ marginBottom: '1em' }}>
              <Grid container>

              <Grid item xs>

         
</Grid>
                <Grid item xs={6}>

                  <h3>{comment.content}</h3>
                  {/* <Button onClick={() => replyComment(comment._id)}>reply</Button> */}
                </Grid>

                <Grid item xs>
                <Button onClick={() => replyComment(comment._id)}>reply</Button>
              </Grid>


                <Grid item xs={12}>

                  <p>{new Date(comment.createdAt).toLocaleString()} </p>
                  <hr/>

                </Grid>
               
                {comment.replies.map((item) => {
                  return <Grid item xs={12}>
                    <p>{item.content} </p>

                    <p>{new Date(item.createdAt).toLocaleString()} </p>
                    <hr/>
                  </Grid>
                })}

              </Grid>
            </Paper>
          })}</div>

          <ReplyDialog open={openReply} onClose={handleReplyClose} onSubmit={handleSubmit} commentId={commentId} setAllQuestion={setAllQuestion} questionId={questionId} makeComment={makeComment} setQuestion={setQuestion} />

        </div>
      </Dialog>
    </div>
  );
};

export default QuestionDialog;
