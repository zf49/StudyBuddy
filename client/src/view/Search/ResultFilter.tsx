import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
interface IFilterList{
    open:boolean,
    handleClickOpen:()=>void,
    handleClose:()=>void,
}

export default function ResultFilter(props:IFilterList) {


  
  return (
    <div>
      {/* <Button variant="outlined" startIcon={<FilterAltIcon />} onClick={props.handleClickOpen}>
            Refine
       </Button> */}
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <DialogTitle id="alert-dialog-title">
          {"Filter List"}
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}