import React, { useMemo } from 'react'
import { useState,useEffect } from 'react';
import { TextField, Button, Grid, Typography, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { IUserDetail, StyledContainer } from '../Profile/Profile';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../../redux/reducer/userReducer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ResultFilter from './ResultFilter';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Search() {

    // define key word
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    const [searchRes, setSearchRes] = useState<IUserDetail[]>([]);

    const [flag, setFlag] = useState(false)

    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    // handel key word change 
    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // main logic of search user
    const handleSearchClick =  () => {
        // TODO: logic of search friend
        // console.log(`item:${searchTerm}`);
        if(searchTerm !== ''){
             axios.post(`http://localhost:8080/users/${searchTerm}`).then((res) => {
                 if(res.data.length===0){
                    setFlag(false)
                 }else{
                setFlag(true)
                setSearchRes(res.data)
                dispatch(storeUser(res.data))
                 }
                // console.log("sR",searchRes)
            })
        }else{
            // console.log("sR",searchRes)
            setFlag(false)
            // setSearchRes([])
        }
    };

    // when user press Enter, show search result 
    const handleKeyDown =  (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter'){
            handleSearchClick()
        }
    };

    //redirect to /frienddetail/
    const handleFriendDetail = (id:string)=>{
        navigate("/frienddetail/", { state: {id:id}})
    }


    const handleFilter = ()=>{
        console.log('button')
    }

    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <>
        {console.log(searchRes)}
        <StyledContainer onKeyDown={handleKeyDown}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        Search Buddies
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        fullWidth
                        variant="outlined"
                        label="Enter search term"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        InputProps={{
                            endAdornment: (
                                <Button variant="contained" 
                                onClick={handleSearchClick}>
                                    Search
                                </Button>
                            )
                        }}
                    />
                </Grid>
                <StyledContainer>
                        {flag===true? 
                    <>
                        <div>
                        <Button variant="outlined" startIcon={<FilterAltIcon />} onClick={handleClickOpen}>
                            Refine
                        </Button>
                            // res Filter
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <DialogTitle id="alert-dialog-title">
          {"Results Filter"}
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>


                        </div>
                        {searchRes.map((item,index)=>{
                            return  <Grid item xs={12}><List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem alignItems="flex-start" onClick={()=>handleFriendDetail(item._id)}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.userAvatar} />
                            </ListItemAvatar>
                            <ListItemText 
                                primary={item.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {'Email: '}
                                        </Typography>
                                        {item.email}
                                        <br/>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {'UniID: '}
                                        </Typography>
                                        {item.uniID}
                                        <br/>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {'Faculty: '}
                                        </Typography>
                                        {item.faculty}
                                        <br/>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {'Major: '}
                                        </Typography>
                                        {item.major}
                                    </React.Fragment>
                                }
                            />
                            </ListItem> 
                            <Divider variant="inset" component="li" />
                            </List></Grid>
                        })}</>:"No users"}  
                        </StyledContainer>
            </Grid>
         </StyledContainer>
        </>
    );
}
