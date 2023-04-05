import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import styled from "@mui/styled-engine";

import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "60%",
  margin: "0 auto",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "1rem",
});

const StyledButton = styled(Button)({
  width: "100%",
});

export interface IUserDetail {
  name: string;
  uniID: string;
  gender: string;
  email: string;
  faculty: string;
  major: string;
  authID: string;
}

export default function Profile() {
  const [userProfile, setUserProfile] = useState<IUserDetail>({
    name: "",
    uniID: "",
    gender: "",
    email: "",
    faculty: "",
    major: "",
    authID: "",
  });

  const { user, isAuthenticated } = useAuth0();
  const userStore = useSelector((state: RootState) => state.storeUser);

  useEffect(() => {
    if (user && isAuthenticated) {
      axios.get(`http://localhost:8080/users/${user.sub}`).then((res) => {
        console.log(res.data);
        setUserProfile(res.data);
      });
    }
  }, [user, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [e.target.value]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);

  };

  const handleSaveChanges = () => {
    // TODO: Save changes to user profile
  };

  return (
    <>
    {console.log(userStore)}
      <StyledContainer>
        <h1>Edit Profile</h1>

        <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}>OP</Avatar>
        //TODO: user Avatar can be changed

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Name"
            name="name"
            value={userStore.user?.name}
            onChange={handleChange}
          />
          <StyledTextField
            label="University ID"
            name="uniID"
            value={userStore.user?.uniID}
            onChange={handleChange}
          />
          <StyledTextField
            label="Gender"
            name="gender"
            value={userStore.user?.gender}
            onChange={handleChange}
          />
          <StyledTextField
            label="Email"
            name="email"
            value={userStore.user?.email}
            onChange={handleChange}
          />

          //TODO: fix faculty and major input
          <StyledTextField
            label="Faculty"
            name="faculty"
            value={userStore.user?.faculty}
            onChange={handleChange}
          />

          <StyledTextField
            label="Major"
            name="major"
            value={userStore.user?.major}
            onChange={handleChange}
          />
          <StyledButton variant="contained" type="submit">
            Save Changes
          </StyledButton>
        </form>
      </StyledContainer>
    </>
  );
}
