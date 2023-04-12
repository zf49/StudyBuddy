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

const theme = createTheme();

export default function Search() {

    // define key word
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchRes, setSearchRes] = useState<string[]>();

    // handel key word change 
    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };



    const handleSearchClick = async () => {
        // TODO: logic of search friend
        console.log(`Searching for friends with term: ${searchTerm}`);

        await axios.post(`http://localhost:8080/users/${searchTerm}`).then((res) => {
            // console.log(res.data)
            setSearchRes(res.data)
        })



    };

    return (
        <ThemeProvider theme={theme}>
            {/* <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        Search Friends
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
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
                <Grid item xs={12}>

                    <Typography variant="h4" align="center">
                        Results
                    </Typography>
                    <Typography variant="h4" align="center">

                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <Grid item xs={12}>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Name:"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Email:
                                            </Typography>
                                            {"I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </Grid>
                        </List>
                    </Typography>



                </Grid>
            </Grid> */}


<Grid container justifyContent="center" alignItems="center" spacing={2}>
  <Grid item xs={12}>
    <Typography variant="h4" align="center">
      Search Friends
    </Typography>
  </Grid>
  <Grid item xs={12} md={6}>
    <TextField
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
  <Grid container justifyContent="center" alignItems="center" spacing={2}>
    <Grid item xs={12}>
        <Typography variant="h4" align="center">
            Results
        </Typography>
    </Grid>
    <Grid item xs={12} md={6}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
                </ListItemAvatar>
                <ListItemText
                    primary="Name:"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Email:
                            </Typography>
                            {"I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    </Grid>
</Grid>

  
</Grid>

        </ThemeProvider>
    );
}
