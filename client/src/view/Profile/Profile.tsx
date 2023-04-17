import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { TextField } from "@mui/material";
import styled from "@mui/styled-engine";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Alert, Slide } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { IMajor, IMajorApiReturn } from '../SignUp/SignUp';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { Collapse, } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'; import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserAvatar from './UserAvatar';




export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "60%",
  margin: "0 auto",
  paddingTop:"2em"
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "1rem",
});

const StyledButton = styled(Button)({
  width: "100%",
});
export interface IUserDetail {
  name: string,
  uniID: string,
  gender: string,
  email: string,
  faculty: string,
  major: string,
  authID: string,
  userAvatar:string,
  _id:string
}


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function Profile() {
  const [facmjor, setfacmjor] = useState<IMajorApiReturn>({
    faculties: [],
    majors: []
  })
  const [userProfile, setUserProfile] = useState<IUserDetail>({
    name: "",
    uniID: "",
    gender: "",
    email: "",
    faculty: "",
    major: "",
    authID: "",
    userAvatar:"",
    _id:""
  });

  const { user, isAuthenticated } = useAuth0();

  // No use
  // const fac = useSelector((state: RootState) => state.faculties.facu)

  // select option
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");

  const [majors, setMajors] = useState<IMajor[]>([])

  const [faculties, setFaculties] = useState<string[]>([])

  const handleFacultyChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
    setSelectedFaculty(value);
    setSelectedMajor("");
  };

  const handleMajorChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
    setSelectedMajor(value);
  };

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };


  const filteredMajors = majors.filter((major) => major.faculty === selectedFaculty);

  // get userprofile
  useEffect(() => {
    const abort = new AbortController()
    if (user && isAuthenticated) {
      // setUserProfile;
      axios.get(`http://localhost:8080/users/${user.sub}`, {
        signal: abort.signal
      }).then((res) => {
        setUserProfile(res.data[0])
        setSelectedFaculty(res.data[0].faculty)
        console.log(res.data[0])
      });
      axios.get("http://localhost:8080/major/", {
        signal: abort.signal
      }).then((res) => {
        console.log("major", res.data.majors)

        setFaculties(res.data.faculties)
        setMajors(res.data.majors)

      })

    }
    return () => {
      abort.abort();
    }
  }, [user, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };


  const handleSaveChanges = async () => {
    console.log(JSON.stringify(userProfile));
    // TODO send update request to backend
    await axios.patch(`http://localhost:8080/users/profile/${userProfile.authID}`, userProfile).then((res) => {
      if (res.data.acknowledged) {
        handleSuccess()
      } else {
        handleError()
      }
    })
  };


  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSuccess = () => {
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 2000);
  };

  const handleError = () => {
    setShowErrorAlert(true);
    setTimeout(() => setShowErrorAlert(false), 2000);
  };


  const changeAva = () => {
    console.log('asd')



  }


  // dialog open or not
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (close:boolean) => {
    setOpen(close)
  };

  const setUserPic = (picSrc:string)=>{
    console.log(picSrc)

    setUserProfile({
      ...userProfile,
      userAvatar: picSrc,
    });
  }



  return (
    <>
      {console.log(userProfile.userAvatar)}

      {/* {console.log(facmjor.faculties)} */}
      <Stack sx={{ width: '100%' }} spacing={2}>
        {showSuccessAlert && (
          <Fade in={showSuccessAlert} timeout={1000}>
            {/* <Collapse in={showSuccessAlert}> */}
            <Alert variant="filled" severity="success" onClose={() => setShowSuccessAlert(false)}>
              This is a success alert — check it out!
          </Alert>
            {/* </Collapse> */}
          </Fade>

        )}
        {showErrorAlert && (
          <Fade in={showSuccessAlert} timeout={1000}>
            <Alert variant="filled" severity="error" onClose={() => setShowErrorAlert(false)}>
              This is an error alert — check it out!
            </Alert>
          </Fade>

        )}
      </Stack>
      <StyledContainer>
        <h1>Edit Profile</h1>
       
        //TODO: user Avatar can be changed
        <div>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 56, height: 56, marginBottom: "1rem" }}
            src={userProfile.userAvatar}
            onClick={handleClickOpen}
          ></Avatar>

          {/* user Avatar */}
          <UserAvatar isOpen={open} handleClose={handleClose} setUserPic={setUserPic} userPic={userProfile.userAvatar}/>
          
        </div>



        <form>
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
          <>
            <FormControl sx={{ width: "100%" }} style={{ marginBottom: "10px" }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                label="Gender"
                name="gender"
                value={userProfile.gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="">
                  <em>Prefer Not To Tell</em>
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </>
          <StyledTextField
            label="Email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
          />

          <div>
            <FormControl sx={{ width: "100%" }} style={{ marginBottom: "10px" }}>
              <InputLabel id="faculty-label">Faculty</InputLabel>
              <Select
                labelId="faculty-label"
                id="faculty-select"
                value={userProfile.faculty}
                label="Faculty"
                name="faculty"
                onChange={handleFacultyChange}
              >
                {faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ width: "100%" }} style={{ marginBottom: "10px" }}>
              <InputLabel id="major-label">Major</InputLabel>
              <Select
                labelId="major-label"
                id="major-select"
                value={userProfile.major}
                label="Major"
                name="major"
                onChange={handleMajorChange}
                disabled={!selectedFaculty}
              >
                {filteredMajors.map((major, index) => (
                  <MenuItem key={index} value={major.major}>
                    {major.major}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <StyledButton variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </StyledButton>
        </form>
      </StyledContainer>
    </>
  );
}