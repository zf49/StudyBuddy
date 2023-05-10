import * as React from 'react';
import { useState } from 'react';
import {Grid,Paper,Fab,Menu,MenuItem, IconButton, Badge,} from '@mui/material';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';

import RateReviewIcon from '@mui/icons-material/RateReview';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper style={{ padding: 8 }}>
          <h1>Home</h1>
          <p>lormasdasd</p>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 8 }}>
          <h1>Home</h1>
          <p>lormasdasd</p>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 8 }}>
          <h1>Home</h1>
          <p>lormasdasd</p>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 8 }}>
          <h1>Home</h1>
          <p>lormasdasd</p>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 8 }}>
          <h1>Home</h1>
          <p>lormasdasd</p>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: 8 }}>
          <h1>Home</h1>
          <p>lormasdasd</p>
        </Paper>
      </Grid>
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
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><CreateIcon/>Post Question</MenuItem>
        <MenuItem onClick={handleClose}><RateReviewIcon/>My Question</MenuItem>

        <MenuItem onClick={handleClose}> <IconButton size="large" aria-label="show 4 new mails" color="inherit">
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
