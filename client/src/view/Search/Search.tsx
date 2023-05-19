import React, { useMemo } from 'react'
import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, List, Menu, MenuItem, Chip, IconButton } from '@mui/material';
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

import { RootState } from '../../redux/store';
import { ICourse } from '../Profile/Course';

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import Recommendation from './Recommendation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth0 } from '@auth0/auth0-react';



export default function Search() {

    const users = useSelector((state: RootState) => state.storeUser.userList);
    // define key word
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [searchRes, setSearchRes] = useState<IUserDetail[]>([]);
    const { getAccessTokenSilently } = useAuth0()

    const [flag, setFlag] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const controller = new AbortController()

    useEffect(() => {
        return () => {
            controller.abort()
        }
    }, [])

    // handel key word change 
    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchTerm(e.target.value);

    };

    // main logic of search user
    const handleSearchClick = async () => {
        // TODO: logic of search friend

        if(searchTerm === ''){
            setFlag(true) 
        }else{


        const token = await getAccessTokenSilently()    
        setFlag(false)
        await axios.post(`http://localhost:8080/users/${searchTerm}`, { signal: controller.signal},{headers: { Authorization: `Bearer ${token}` } }).then((res) => {
                setSearchRes(res.data)
                dispatch(storeUser(res.data))
        })
    }
    };

    // when user press Enter, show search result 
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick()
        }
    };

    //redirect to /frienddetail/
    const handleFriendDetail = (id: string) => {
        console.log(id)
        navigate("/frienddetail", { state: { "id": id } })
        // navigate(`/frienddetail?id=${id}`)

    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectedCourses = (selectedCourses: string[]) => {
        console.log(selectedCourses);

        const arr: IUserDetail[] = []

        searchRes.map((item) => {
            selectedCourses.forEach(element => {
                item.courses.map((course) => {
                    if (element === course.CourseNName) {
                        arr.push(item)
                    }
                })
            });
        })
        const newArr = Array.from(new Set(arr));
        console.log(newArr)
        setSearchRes(newArr)
    };

    return (
        <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <div>
                <h1>Search Buddies</h1>
                <Paper sx={{ p: 2 }}>
                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onKeyDown={handleKeyDown}
                                fullWidth
                                variant="outlined"
                                label="Search Buddies"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                InputProps={{
                                    endAdornment: (
                                        <>
                                            <Button onClick={handleClickOpen}>
                                                <FilterAltIcon />
                                            </Button>
                                            <Button variant="contained"
                                                onClick={handleSearchClick}>
                                                Search
                                </Button>
                                        </>
                                    )
                                }}
                            />
                        </Grid>
                        <ResultFilter open={open}
                            handleClickOpen={handleClickOpen}
                            handleClose={handleClose}
                            users={searchRes}
                            onSelectedCoursesChange={handleSelectedCourses}
                        />
                    </Grid>
                    {flag ? <Recommendation /> :

                        <Box display="flex" flexDirection="column" alignItems="center">
                            {searchRes.length>0?searchRes.map((item) => (
                                <Box
                                    key={item._id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "1em",
                                        padding: "1em",
                                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                                        borderRadius: "5px",
                                        width: "100%",
                                    }}
                                    onClick={() => handleFriendDetail(item._id)}
                                >
                                    <Avatar alt="Remy Sharp" src={item.userAvatar} sx={{ marginRight: "1em" }} />
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">{item.name}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography>{item.uniID}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography>{item.email}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography>{item.faculty}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography>{item.major}</Typography>
                                        </Grid>
                                        <Grid item component="div" xs={12}>
                                            <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
                                                {item.courses.map((course) => (
                                                    <Chip
                                                        key={course.course_code}
                                                        label={course.CourseNName}
                                                        sx={{ marginRight: "0.5em", marginBottom: "0.5em" }}
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <IconButton onClick={() => handleFriendDetail(item._id)}>
                                        <ArrowForwardIcon />
                                    </IconButton>
                                </Box>
                            )):<div style={{marginTop:'1em'}}>No User! Input another keyword again!</div>}
                        </Box>

                    }
                </Paper>
            </div>
        </div>     
    );
}



