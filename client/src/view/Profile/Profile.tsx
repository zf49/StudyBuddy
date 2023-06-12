import { useAuth0 } from "@auth0/auth0-react";
import {
  Alert, Avatar,
  Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from '@mui/material/Stack';
import styled from "@mui/styled-engine";
import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState, useCallback } from 'react';
import { IMajor } from '../SignUp/SignUp';
import Course, { ICourse } from './Course';
import UserAvatar from './UserAvatar';


export const StyledContainer = styled("div")({
  margin: "0 auto",
  paddingTop: "2.0em"
});

export const StyledTextField = styled(TextField)({
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
  userAvatar: string,
  _id: string,
  courses: ICourse[],
  matchedCount: number,
  semester:string
}

const defaultUserData: IUserDetail = {
  name: "",
  uniID: "",
  gender: "",
  email: "",
  faculty: "",
  major: "",
  authID: "",
  userAvatar: "",
  _id: "",
  courses: [],
  matchedCount: 0,
  semester:""
}


export default function Profile() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const abortRequest = new AbortController();

  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<IUserDetail>(defaultUserData);

  // select option
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");
  const [majors, setMajors] = useState<IMajor[]>([])
  const [faculties, setFaculties] = useState<string[]>([])

  const updateUserProfile = (partialData: Partial<IUserDetail>) => {
    setUserProfile((exisitingData) => {

      const mergeData: IUserDetail = exisitingData ? {
        ...defaultUserData,
        ...exisitingData,
      } : defaultUserData;

      const result = {
        ...mergeData,
        ...partialData,
      }

      console.log('update result', result)

      return result;
    });
  }

  const handleFacultyChange = (value: string) => {
    updateUserProfile({
      faculty: value,
      major: ""
    });
    setSelectedFaculty(value);
  };

  const handleMajorChange = (value: string) => {
    console.log('major', value)
    updateUserProfile({
      major: value,
    });
  };



  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    updateUserProfile({
      gender: value,
    });
  };

  const filteredMajors = majors.filter((major) => major.faculty === selectedFaculty);

  // get userprofile
  useEffect(() => {

    const fetchData = async () => {
      if (user && isAuthenticated) {
        // updateUserProfile;
        const token = await getAccessTokenSilently()
        await axios.get(`http://localhost:8080/users/${user.sub}`, {
          signal: abortRequest.signal,
          headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {

          console.log("get users", res.data)

          const dbUserValidate = Joi.object<IUserDetail>({
            name: Joi.string().required(),
            uniID: Joi.string().required(),
            gender: Joi.string().required().allow(null, ''),
            email: Joi.string().required().allow(null, ''),
            faculty: Joi.string().required().allow(null, ''),
            major: Joi.string().required().allow(null, ''),
            authID: Joi.string().required(),
            userAvatar: Joi.string().required(),
            _id: Joi.string().required(),
            semester:Joi.string().allow(null, ''),
            courses: Joi.array().items(
              Joi.object<ICourse>({
                course_code: Joi.string().required(),
                course_name: Joi.string().required(),
                CourseNName: Joi.string().required(),
              }).unknown(true)
            ).required().allow(null)
          }).unknown(true).validate(res.data)

          console.log(dbUserValidate)

          if (dbUserValidate.error) {
            console.log('dbUserValidate.error',dbUserValidate.error)
          } else {
            console.log('useEffect updateUserProfile', dbUserValidate.value)
            updateUserProfile(dbUserValidate.value)
            setSelectedFaculty(dbUserValidate.value.faculty)
            console.log(userProfile)
            // updateUserProfile(res.data)
            // setSelectedFaculty(res.data.faculty)

          }
        });

        await axios.get("http://localhost:8080/major/", {
          signal: abortRequest.signal,
          headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
          const dbFacultiesValidate = Joi.array().items(Joi.string().required()).required().validate(res.data.faculties)
          if (dbFacultiesValidate.error) {
            console.log(dbFacultiesValidate.error)
          } else {
            setFaculties(dbFacultiesValidate.value)
          }
          const dbMajorsValidate = Joi.array().items(
            Joi.object<IMajor>({
              faculty: Joi.string().required(),
              major: Joi.string().required()
            }).unknown(true)
          ).validate(res.data.majors)
          if (dbMajorsValidate.error) {
            console.log(dbMajorsValidate.error)
          } else {
            setMajors(dbMajorsValidate.value)
          }
        })
      }
    }

    setIsLoading(true)
    fetchData().finally(() => {
      if (abortRequest.signal.aborted) return;
      setIsLoading(false)
    })

    return () => {
      abortRequest.abort();
    }
  }, [user, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {

    if (!userProfile) {
      console.error("cannot save user profile null")
      return;
    }

    console.log(JSON.stringify(userProfile));

    if (userProfile.name === '' || userProfile.uniID === '') {
      handleError()
    } else {
      const token = await getAccessTokenSilently()

      axios.patch(`http://localhost:8080/users/profile/${userProfile.authID}`, userProfile, { signal: abortRequest.signal, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        const acknowledgedValidate = Joi.boolean().required().validate(res.data.acknowledged)
        if (acknowledgedValidate.error) {
          console.log(acknowledgedValidate.error)
        } else {
          if (res.data.acknowledged) {
            handleSuccess()
          } else {
            handleError()
          }
        }
      })
    }
  };

  // click save button, if success the green alert will appear, if failed alert will be red 
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSuccess = () => {
    setShowSuccessAlert(true);
    setShowErrorAlert(false);
    setTimeout(() => setShowSuccessAlert(false), 2000);
  };

  const handleError = () => {
    setShowErrorAlert(true);
    setShowSuccessAlert(false);
    setTimeout(() => setShowErrorAlert(false), 2000);
  };


  // dialog open or not
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (close: boolean) => {
    setOpen(close)
  };

  const setUserPic = (picSrc: string) => {
    console.log(picSrc)

    updateUserProfile({
      userAvatar: picSrc,
    });
  }




  const setCourse = (value: ICourse[]) => {
    updateUserProfile({
      courses: value,
    });
  }

  const setSemester = (value: string) => {
    updateUserProfile({
      semester: value,
    });
  }



  console.log("MY DEBUG", userProfile && userProfile.userAvatar)

  if (isLoading) {
    return <CircularProgress />;
  }

  return (

    <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
      <Stack spacing={2}>
        {showSuccessAlert && (
          <Fade in={showSuccessAlert} timeout={1000} >
            <Alert variant="filled" severity="success" onClose={() => setShowSuccessAlert(false)} sx={{ position: 'fixed', zIndex: '1', width: '80vw', left: '0', right: '0', margin: '-3em auto' }}>
              This is a success alert
          </Alert>
          </Fade>
        )}
        {showErrorAlert && (
          <Fade in={showErrorAlert} timeout={1000}>
            <Alert variant="filled" severity="error" onClose={() => setShowErrorAlert(false)} sx={{ position: 'fixed', zIndex: '1', width: '80vw', left: '0', right: '0', margin: '-3em auto' }}>
              This is an error alert — check it out!
            </Alert>
          </Fade>
        )}
      </Stack>
      <div >
      <Paper elevation={24} >

        <h1>Edit Profile</h1>
        <div style={{
          'display': 'flex',
          'justifyContent': 'center'
        }}>
          {
            userProfile && userProfile.userAvatar && <Avatar sx={{ bgcolor: deepPurple[500], width: 100, height: 100, marginBottom: "1rem" ,position: 'relative',
            '&:hover::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.2)',
            }}}
            
              src={userProfile.userAvatar}
              onClick={handleClickOpen}
            />
          }
          {/* user Avatar */}
          {
            userProfile && userProfile.userAvatar && <UserAvatar isOpen={open} handleClose={handleClose} setUserPic={setUserPic} userPic={userProfile.userAvatar} />
          }

        </div>



          <form style={{ padding: '1em' }}>
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
              onChange={handleChange} sx={{ opacity: 1 }}

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
                  sx={{ textAlign: 'left' }}
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
              <FormControl sx={{ width: "100%" }} style={{ textAlign: 'left', marginBottom: "10px" }}>
                <InputLabel id="faculty-label">Faculty</InputLabel>
                <Select
                  labelId="faculty-label"
                  id="faculty-select"
                  value={userProfile.faculty}
                  label="Faculty"
                  name="faculty"
                  onChange={(e) => handleFacultyChange(e.target.value)}
                >
                  {faculties.map((faculty) => (
                    <MenuItem key={faculty} value={faculty}>
                      {faculty}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div >
              <FormControl sx={{ width: "100%", textAlign: 'left' }} >
                <InputLabel id="major-label">Major</InputLabel>
                <Select
                  labelId="major-label"
                  id="major-select"
                  value={userProfile.major}
                  label="Major"
                  name="major"
                  onChange={(e) => handleMajorChange(e.target.value)}
                  disabled={!selectedFaculty}
                >
                  {filteredMajors.map((major, index) => (
                    <MenuItem key={index} value={major.major}>
                      {major.major}
                    </MenuItem>
                  ))}
                </Select>

                <Course selectedCourse={userProfile.courses} setCourse={setCourse} selectedSemester={userProfile.semester} setSemester={setSemester}/>
              </FormControl>
            </div>
          </form>
        </Paper>
        <StyledButton variant="contained" onClick={handleSaveChanges} style={{ marginTop: "10px", marginBottom: "3em" }}>
          Save Changes
          </StyledButton>
      
      </div>
    </div>
  );
}