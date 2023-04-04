import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  });
  
  const FormContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  });
  
  const Input = styled(TextField)({
    marginBottom: "16px",
    width: "100%",
  });
  
  const ButtonContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  });



export default function Profile() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user,isAuthenticated} = useAuth0()
    const [userProfile,setUserProfile] = useState([])
    const handleSaveChanges = () => {
      // TODO: Save changes to user profile
    };


    useEffect(() => {

        if(user && isAuthenticated){

            axios.get(`http://localhost:8080/users/${user.sub}`).then((res)=>{
                console.log(res.data)
            })

        }

    }, [user,isAuthenticated])

    const {userID} = useSelector((state: RootState) => state.userID)

    return (
        <div>
            Profile 
            ID: {userID}
        </div>
    )
}
