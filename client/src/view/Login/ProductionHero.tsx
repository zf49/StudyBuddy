import { Button, Typography } from '@mui/material';
import * as React from 'react';
import ProductHeroLayout from './ProductHeroLayout';
import image from './../../ICON/dog.png';
import learn from './../../ICON/learn.png'


export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${learn})`,
        backgroundColor: '#ADD8E6',
        backgroundPosition: ' center calc(100% + 40em)',
        backgroundAttachment:'fixed'
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      {/* <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      /> */}
      {/* <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography> */}
      <Typography color="inherit" align="center" variant="h2" >
      Find Your Study Buddies Now!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        You can find study buddies who share the same interests and goals as you here.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Sign Up/Log In
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}
