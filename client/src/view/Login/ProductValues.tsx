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
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'white',opacity: '0.95' }}
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
              <Typography variant="h5" sx={{ my: 5 }}>
                Find your classmates or friends
              </Typography>
              <Typography variant="h6">
                
                {
                  'Connect and collaborate with University of Auckland students from diverse fields, fostering academic growth, networking, and a sense of belonging.'
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
              <Typography variant="h5" sx={{ my: 5 }}>
              Ask your questions about study
              </Typography>
              <Typography variant="h6">
                {
                  'Our interactive platform enables vibrant conversations, fostering community and connection as users engage in discussions, share insights, and seek advice, sparking meaningful exchanges among fellow users.'
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
              <Typography variant="h5" sx={{ my: 5 }}>
                Follow and talk to your buddies
              </Typography>
              <Typography variant="h6">
                {'Easily connect and chat with friends, expanding your social network and fostering meaningful connections.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
