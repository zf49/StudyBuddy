import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Paper, Fab, Menu, MenuItem, IconButton, Badge, } from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios'
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function FloatingButton() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleButtonClose = () => {
        console.log('adasd')
        setAnchorEl(null);
    };


    
    return (
        <div>
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
        </div>
    )
}
