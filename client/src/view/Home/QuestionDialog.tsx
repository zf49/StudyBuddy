import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { IQuestion } from './Home';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, TextField, Box, } from '@mui/material';
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
import SendIcon from '@mui/icons-material/Send';
import QuickreplyIcon from '@mui/icons-material/Quickreply';



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
        <Typography sx={{ ml: 2, flex: 1, wordBreak: 'break-word' }} variant="h6" component="div">
        </Typography>
      </Toolbar>
    </AppBar>
    <Box sx={{ p: 3, mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" sx={{ ml: 2, flex: 1, wordBreak: 'break-word' }}>{question.title}</Typography>
      <Typography variant="body1" sx={{ ml: 2, flex: 1, wordBreak: 'break-word' }}>{question.content}</Typography>
      <Typography variant="caption" align="right">{"Author name: " + question.authorName + "  " + new Date(question.createdAt).toLocaleString()}</Typography>
    </Box>
    <Box sx={{ p: 3, mt: 1 }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            id="filled-textarea"
            label="Comment"
            multiline
            variant="filled"
            fullWidth
            value={comment}
            onChange={handleCommentChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" fullWidth onClick={() => makeComment(question._id)}
          startIcon={<SendIcon/>}
          >Submit</Button>

        </Grid>
      </Grid>
    </Box>
    {question.comments.map((comment) => {
      return (
        <Box key={comment._id} sx={{ p: 3, mt: 1, display: 'flex', flexDirection: 'column', gap: 2, boxShadow: 3,margin:'1em' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="body1">{comment.content}</Typography>
            <Typography variant="caption" align="right">{new Date(comment.createdAt).toLocaleString()}</Typography>
          </Box>
          <Button variant="contained" onClick={() => replyComment(comment._id)}
          startIcon={<QuickreplyIcon/>}
          >Reply</Button>
          {comment.replies.map((item, index) => (
            <Box key={index} sx={{ p: 2, mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">{item.content}</Typography>
              <Typography variant="caption" align="right">{new Date(item.createdAt).toLocaleString()}</Typography>
              <Divider/>
            </Box>
          ))}
        </Box>
      )
    })}
    <ReplyDialog open={openReply} onClose={handleReplyClose} onSubmit={handleSubmit} commentId={commentId} setAllQuestion={setAllQuestion} questionId={questionId} makeComment={makeComment} setQuestion={setQuestion} />
  </Dialog>
</div>

  );
};

export default QuestionDialog;
