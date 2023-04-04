import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import styled from "@mui/styled-engine";


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


  interface IUser {
    _id: string;
    name: string;
    uniID: string;
    gender: string;
    email: string;
    faculty: string;
    major: string;
    authID: string;
  }

export default function Profile() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user,isAuthenticated} = useAuth0()
    const [userProfile, setUserProfile] = useState<IUser>({
        _id: "",
        name: "",
        uniID: "",
        gender: "",
        email: "",
        faculty: "",
        major: "",
        authID: "",
      });



    const handleSaveChanges = () => {
      // TODO: Save changes to user profile
    };


    useEffect(() => {

        if(user && isAuthenticated){

            axios.get(`http://localhost:8080/users/${user.sub}`).then((res)=>{
                console.log(res.data)
                setUserProfile(res.data)
            })

        }

    }, [user,isAuthenticated])

    const {userID} = useSelector((state: RootState) => state.userID)


      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserProfile({
          ...userProfile,
          [event.target.name]: event.target.value,
        });
      };
    
      const handleSubmit= (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userProfile);
      };
    



    return (
        <>
          <StyledContainer>
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <StyledTextField
                    label="ID"
                    name="_id"
                    value={userProfile._id}
                    onChange={handleChange}
                    />
                    <StyledTextField
                    label="Name"
                    name="name"
                    value={userProfile.name}
                    onChange={handleChange}
                    />
                    <StyledTextField
                    label="University ID"
                    name="uniID"
                    value={userProfile.uniID}
                    onChange={handleChange}
                    />
                    <StyledTextField
                    label="Gender"
                    name="gender"
                    value={userProfile.gender}
                    onChange={handleChange}
                    />
                    <StyledTextField
                    label="Email"
                    name="email"
                    value={userProfile.email}
                    onChange={handleChange}
                    />
                    <StyledTextField
                    label="Faculty"
                    name="faculty"
                    value={userProfile.faculty}
                    onChange={handleChange}
                    />
                    //TODO fixed faculty and major inpit
                    <StyledTextField
                    label="Major"
                    name="major"
                    value={userProfile.major}
                    onChange={handleChange}
                    />
                    <StyledButton variant="contained" type="submit">
                    Save Changes
                    </StyledButton>
                </form>
            </StyledContainer>
        </>
         
  
    )
}
