// import React from 'react'

// import { useAuth0 } from "@auth0/auth0-react";


// export default function Login() {
//     const { loginWithRedirect } = useAuth0();

//     const {isAuthenticated} = useAuth0();


//     const login = ()=>{
//         loginWithRedirect()
//         isAuthenticated && localStorage.setItem('token','123')
//     }

//     return (
//        <>
//         {/* {login()} */}
        
//        </>     
//     )
// }



import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import image from './../../ICON/hdog.png';
import dogPic from './../../ICON/dog.png' 
import { useAuth0 } from "@auth0/auth0-react";
import  { useNavigate } from 'react-router-dom'

const RootBox = styled(Box)({
  background: '#BFEFFF',
  backgroundImage: `url(${dogPic})`,
  backgroundColor: '#ADD8E6',
  backgroundSize: '5em',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ImageBox = styled(Box)({
  width: '60vh',
  height: '60vh',
  position: 'relative',
  '&:hover img': {
    filter: 'blur(5px)',
  },
  '&:hover button': {
    opacity: 1,
    transform: 'translateY(-50%)',
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

export default function Login() {

    const navigate = useNavigate()
   
    
   
    const { user, isAuthenticated, isLoading,loginWithRedirect,getAccessTokenSilently } = useAuth0();

  
     const handleLoginClick = async () => {
        await loginWithRedirect()
        
  };

  return (
    <RootBox>
      <ImageBox>
        <StyledImage src={image} alt="example" />
        <StyledButton variant="contained" color='secondary' onClick={()=>{
            handleLoginClick()
        }}>Login</StyledButton>
      </ImageBox>
    </RootBox>
  );
}




