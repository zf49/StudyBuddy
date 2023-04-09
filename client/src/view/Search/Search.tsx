import React from 'react'
import { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Search() {

// define key word
const [searchTerm, setSearchTerm] = useState<string>('');

// handel key word change 
const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
};

const handleSearchClick = () => {
  // TODO: logic of search friend
  console.log(`Searching for friends with term: ${searchTerm}`);
};

return (
    <ThemeProvider theme={theme}>
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
    </Grid>
  </ThemeProvider>
);
}
