import React, { useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { TextField } from "@mui/material";
import styled from "@mui/styled-engine";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Alert, Slide } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { IMajor, IMajorApiReturn } from '../SignUp/SignUp';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { Collapse, } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import { useAuth0 } from '@auth0/auth0-react';
import ImageListItem from '@mui/material/ImageListItem'; import {
    Avatar,
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';




const StyledContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    margin: "0 auto",
});



interface IUserAvatar {
    isOpen: boolean,
    handleClose: (close: boolean) => void,
    setUserPic:(picSrc:string)=>void,
    userPic:string
}

interface Image {
    name: string;
    src: string;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=6',
    'https://i.pravatar.cc/150?img=7',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=9',
];


export default function UserAvatar(props: IUserAvatar) {
    // dialog open or not

    
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
    const { user,isAuthenticated } = useAuth0();
    const [defaultAvatar, setDefaultAvatar] = useState<string[]|null>(avatars)
    const [avatar, setAvatar] = useState(props.userPic);

  



    const handleCloseDialog = () => {
        props.handleClose(false)
    };

    const handleAvatarClick = (index: number) => {
        setSelectedAvatar(index);

        setAvatar(avatars[index - 1])
    };

    const saveAvatar = () => {
        props.setUserPic(avatar)
        props.handleClose(false)

    }

    // upload
    const [images, setImages] = useState<Image[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image: Image = {
                    name: file.name,
                    src: event.target?.result as string
                };
                setImages([...images, image]);
            };

            reader.readAsDataURL(file);
        }
        setAvatar(images[0].src)
    };


    return (
        <>
        {/* {console.log(user?.picture)} */}
            <Dialog
                fullScreen
                open={props.isOpen}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        </Typography>
                        <Button autoFocus color="inherit"
                            onClick={saveAvatar}
                        >
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent  >
                    <StyledContainer>
                        <Avatar
                            sx={{ width: 200, height: 200 }}
                            src={avatar}
                        />
                        // TODO upload user avatar
                        {/* <Button variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" type="file" onChange={handleFileChange}/>
                        </Button> */}




                    </StyledContainer>
                    <StyledContainer>
                        <ImageList sx={{ width: 500, height: 450 }} cols={3} >
                            {avatars.map((avatar, index) => (
                                <StyledContainer>

                                    <ImageListItem key={index}>
                                        <Avatar
                                            sx={{ width: 80, height: 80 }}
                                            src={avatar}
                                            onClick={() => handleAvatarClick(index + 1)}
                                            className={selectedAvatar === index + 1 ? 'selected' : ''}
                                        />
                                    </ImageListItem>
                                </StyledContainer>
                            ))}
                        </ImageList>

                    </StyledContainer>

                </DialogContent>
            </Dialog>
        </>
    )
}
