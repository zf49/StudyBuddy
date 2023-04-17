import React from 'react'
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button, Grid, Typography, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { IUserDetail, StyledContainer } from '../Profile/Profile';
import { useNavigate } from 'react-router';
export default function Search() {

    // define key word
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchRes, setSearchRes] = useState<IUserDetail[]>();
    const navigate = useNavigate()
    // handel key word change 
    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = async () => {
        // TODO: logic of search friend
        console.log(`item:${searchTerm}`);
        await axios.post(`http://localhost:8080/users/${searchTerm}`).then((res) => {
            // console.log(res.data)
            setSearchRes(res.data)
        })
    };

    const handleFriendDetail = (id:string)=>{
        navigate("/frienddetail/", { state: { "id": id } })
    }

    return (
        <>
        // TODO : back to search page with data
        {console.log(searchRes)}
        <StyledContainer>
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
                                <Button variant="contained" onClick={handleSearchClick}>
                                    Search
                                </Button>
                            )
                        }}
                    />
                </Grid>
                <StyledContainer>
                {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> */}
                        
                        {searchRes!==undefined?searchRes.map((item,index)=>{
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
                        }):"No users"}  
                        </StyledContainer>
            </Grid>
         </StyledContainer>
        </>
    );
}
