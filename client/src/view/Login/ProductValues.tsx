import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import CurvyLine from './../.././ICON/vecteezy_abstract-wavy-stripes-on-a-white-background-isolated-wave_4230475.jpg'
import SearchIcon from '@mui/icons-material/Search';
import find from './../../ICON/find.png'
import postQuestion from './../../ICON/postQuestion.png'
import communication from './../../ICON/communicate.png'
const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      //TODO :Bgcolor
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: '' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
        //   src={CurvyLine}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={find}
                alt="suitcase"
                sx={{ height: 100 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Find your classmates or friends
              </Typography>
              <Typography variant="h5">
                
                {
                  'Discover a vibrant community of University of Auckland students, where you can connect with peers from diverse disciplines and forge valuable connections for your academic journey. Whether you are seeking study groups, networking opportunities, or simply a sense of belonging, this platform brings together a wide range of UoA students, fostering collaboration, support, and a shared passion for learning'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={postQuestion}
                alt="graph"
                sx={{ height: 100 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              Ask your questions about study
              </Typography>
              <Typography variant="h5">
                {
                  'Engage in dynamic conversations and foster a sense of community through our interactive posting and reply feature. Share your thoughts, ask questions, and join in discussions with fellow users. Whether you are seeking advice, sharing insights, or sparking meaningful exchanges, our platform provides a space for you to express yourself and connect with others.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={communication}
                alt="clock"
                sx={{ height: 100 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Talk to your friends
              </Typography>
              <Typography variant="h5">
                {'Expand your social network and stay connected with friends through our user-friendly friend addition and chat functionality. Easily find and add friends, and enjoy seamless conversations with them. Whether you want to catch up, share exciting news, or simply have a casual chat, our platform provides a convenient way to stay in touch and nurture meaningful connections with your friends'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
