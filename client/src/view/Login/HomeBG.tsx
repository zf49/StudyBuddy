import { Button, Typography } from '@mui/material';
import * as React from 'react';
import ProductHeroLayout from './HomeMain';
import hdog from './../../ICON/hdog.png';
import learn from './../../ICON/learn.png'
import downArrow from './../../ICON/downArrow.png'
import { styled } from '@mui/material/styles';
import { Box} from '@mui/material';
import dogPic from './../../ICON/dog.png' 
import { useAuth0 } from '@auth0/auth0-react';


// export const RootBox = styled(Box)({
//   background: '#BFEFFF',
//   backgroundImage: `url(${dogPic})`,
//   backgroundColor: '#ADD8E6',
//   backgroundSize: '5em',
//   backgroundPosition: 'center',
//   height: '100vh',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });

const ImageBox = styled(Box)({
  width: 'auto',
  height: 'auto',
  position: 'relative',
  '&:hover img': {
    filter: 'blur(10px)',
  },
  '&:hover button': {
    opacity: 1,
    // transform: 'translateY(-50%)',
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledButton = styled(Button)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
  transition: 'all 0.2s ease',
  
});



export default function ProductHero() {
  const { loginWithRedirect } = useAuth0();

  const handleLoginClick = async () => {
    try {
      await loginWithRedirect()
     
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${learn})`,
        backgroundColor: '#ADD8E6',
        backgroundPosition: ' center calc(100% + 40em)',
        backgroundAttachment:'fixed'
      }}
    >
      <Typography color="inherit" align="center" variant="h2" sx={{marginTop:'2em'}}>
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
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
      <img
        style={{ width: '5em', height: '5em' }}
        src={downArrow}
        alt="increase priority"
      />

      <Box style={{width:'30%',height:'30%'}}>
      <ImageBox>
      <StyledImage src={hdog} alt="example" />
        <StyledButton variant="contained" color='secondary' onClick={()=>{
            handleLoginClick()
        }}>Sign Up/Login</StyledButton>
      </ImageBox>
      </Box>
     
      

    </ProductHeroLayout>
  );
}
