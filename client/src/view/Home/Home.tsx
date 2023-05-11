import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, } from '@mui/material';
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



interface IQuestion {
    _id: string;
    authorId: string;
    title: string;
    content: string;
    // comments: IComment[];
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const [allQuestion, setAllQuestion] = useState<IQuestion[]>([]);



    useEffect(() => {

        axios.get('http://localhost:8080/question/allQuestion').then((res) => {
            setAllQuestion(res.data.data)
        })

    })





    const handleButtonClose = () => {
        console.log('adasd')
        setAnchorEl(null);
    };


    const checkQuestion = () => {
        console.log('checkQuestion')
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: 8 }}>
                    <h1>Home</h1>
                    <p>lormasdasd</p>
                </Paper>
            </Grid>
            <>
                {allQuestion.map((item) => {
                    return (

                        <>
                            <Grid item xs={12} onClick={handleClickOpen}>
                                <Paper style={{ padding: 8 }}>
                                    <h1>{item.title}</h1>
                                    <p>{item.content}</p>
                                </Paper>
                            </Grid>
                            <div>
                                <Dialog
                                    fullScreen
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Transition}
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
                                                {item.title}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <Paper>
                                    <h1>{item.content}</h1>
                                    <p>{item.authorId}</p>
                                    <p>{new Date(item.createdAt).toLocaleString()}</p>
                                    </Paper>
                                </Dialog>
                            </div>
                        </>


                    );
                })}
            </>



            <Fab
                style={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
                color="secondary"
                aria-label="add"
                onClick={handleClick}
            >
                <UpIcon />
            </Fab>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleButtonClose}
            >
                <MenuItem onClick={handleButtonClose}>
                    <IconButton size="large" color="inherit">

                        <CreateIcon />
                    </IconButton>
                    <p>Post Question</p>
                </MenuItem>
                <MenuItem onClick={handleButtonClose}>
                    <IconButton size="large" color="inherit">

                        <RateReviewIcon />
                    </IconButton>
                    <p>My Question</p>
                </MenuItem>

                <MenuItem onClick={handleButtonClose}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
            </Menu>
        </Grid>
    );
};

export default Home;
