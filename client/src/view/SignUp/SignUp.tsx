import React, { ChangeEvent, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { create } from 'domain';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';

export default function SignUp() {

    const {user,isAuthenticated} = useAuth0()

    const [name, setName] = React.useState('');
    const [uniID, setUniID] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [faculty, setFaculty] = React.useState('');
    const [major, setMajor] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [faculties, setFaculties] = React.useState<any>([]);
    const [majors, setMajors] = React.useState<any>([]);
    const [loginEmail, setLoginEmail] = React.useState<any>('');



    useEffect(() => {
        async function fetchData() {
            isAuthenticated && setLoginEmail(user?.email)
            const res = await axios.get("http://localhost:8080/major")
            setMajors(res.data.majors)
            setFaculties(res.data.faculties)
        }
        fetchData()
    }, [])


    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleUniID = (event: ChangeEvent<HTMLInputElement>) => {
        setUniID(event.target.value);
    };
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handleGender = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };
    const handleFaculty = (event: SelectChangeEvent) => {
        setFaculty(event.target.value);
        setMajor('')
    };
    const handleMajor = (event: SelectChangeEvent) => {
        setMajor(event.target.value);
    };

    async function handleSubmit() {
        const sessionData: {
            name: String,
            uniID: String,
            gender: String,
            email: String,
            faculty: String,
            major: String,
            loginEmail:String
        } = {
            name: name,
            uniID: uniID,
            gender: gender,
            email: email,
            faculty: faculty,
            major: major,
            loginEmail:loginEmail
        }

        if (sessionData.name && sessionData.uniID) {
            await createUser(sessionData)
        } else {
            setMessage("All required fields must be filled in!")
        }
    }

    async function createUser(user: object) {
        console.log(user)
        const response = await axios.post(
            "http://localhost:8080/users/register",
            user
        )
    }

    return (
        <div style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Typography variant="h6" gutterBottom>
                    Register
                </Typography>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <TextField
                    required
                    id="name"
                    label="Name"
                    onChange={handleName}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <TextField
                    required
                    id="uniID"
                    label="Uni ID"
                    onChange={handleUniID}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        id="gender"
                        value={gender}
                        onChange={handleGender}
                    >
                        <MenuItem value="">
                            <em>Prefer Not To Tell</em>
                        </MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <TextField
                    id="email"
                    label="Communication Email"
                    onChange={handleEmail}
                    fullWidth
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Faculty</InputLabel>
                    <Select
                        id="faculty"
                        value={faculty}
                        onChange={handleFaculty}
                    >
                        <MenuItem value="">
                            <em>Prefer Not To Tell</em>
                        </MenuItem>
                        {faculties.map((faculty: any) => {
                            return (<MenuItem value={faculty}>{faculty}</MenuItem>)
                        })}


                    </Select>
                </FormControl>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Major</InputLabel>
                    <Select
                        id="major"
                        value={major}
                        onChange={handleMajor}
                    >
                        <MenuItem value="">
                            <em>Prefer Not To Tell</em>
                        </MenuItem>
                        {majors.map((major: any) => {
                            if (major.faculty == faculty)
                                return (<MenuItem value={major.major}>{major.major}</MenuItem>)

                        })}

                    </Select>
                </FormControl>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <Button variant="contained"
                    onClick={handleSubmit}
                >
                    Continue
                </Button>
            </div>
            <div>
                {message && <Alert severity="error">{message}</Alert>}
            </div>
            


        </div>

    )
}
