import React from 'react'

import { Box, Divider, List, ListItem, Paper, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
  ];


export default function Recommendation() {

    


    return (
        <div>
                <h1>user u may know</h1>
                <Box sx={{ overflowX: 'auto', maxWidth: '100%', display: 'flex' }}>
                <List sx={{ display: 'flex', flexDirection: 'row' }}>
                    {items.map(item => (
                    <Paper elevation={24} sx={{margin:'0.5em'}}>
                    <ListItem key={item.id}>
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
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                        />
                    </ListItem>                        <Divider orientation="vertical" variant="middle" flexItem /></Paper>))}
                    <Paper elevation={24} sx={{margin:'0.5em'}}>

                    <ListItem >
                        <ListItemText
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            {"More USers"}
                            <ArrowCircleRightIcon/>
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    </Paper>
                </List>
                </Box>
        </div>
    )
}
