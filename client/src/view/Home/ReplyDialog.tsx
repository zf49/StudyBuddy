import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Dispatch, SetStateAction } from 'react';
import { IComment, IQuestion } from './Home';



interface Props {
commentId:string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  setAllQuestion: Dispatch<SetStateAction<IQuestion[]>>;
  makeComment: (questionId:string)=>void;
  questionId:string;
  setQuestion: Dispatch<SetStateAction<IQuestion>>
}



const ReplyDialog: React.FC<Props> = (props) => {

  const { open, onClose, onSubmit,commentId, setAllQuestion,makeComment,questionId,setQuestion} = props;
  const [comment, setComment] = React.useState('');

    const {user,getAccessTokenSilently} = useAuth0()

   

  const handleSubmit = async () => {
   
    const newReply = {
        "commentID": commentId,
        "authorId":user?.sub,
        "content":comment
      }

const token = await getAccessTokenSilently()

    await axios.post('http://localhost:8080/reply/postNewReply',newReply,{headers: {Authorization: `Bearer ${token}`}}).then((res)=>{
       setAllQuestion(res.data)

       res.data.map((item: IQuestion) => {
            item.comments.map((comment:IComment)=>{
                if(comment._id === commentId){
                    setQuestion(item)
                }
            })
      })
    })
    onSubmit();
  };

  return (
    <Dialog keepMounted open={open} onClose={onClose}>
      <DialogTitle>Reply to Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your reply below:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Reply"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReplyDialog;