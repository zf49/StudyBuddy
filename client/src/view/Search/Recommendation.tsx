import React, { useEffect, useState } from 'react'

import { Avatar, Box, Divider, List, ListItem, Paper, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import { IUserDetail } from '../Profile/Profile';
import { useNavigate } from 'react-router';

const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
    { id: 5, name: 'Item 5' },
  ];


  const testData= {
    "courses":[
      {
        "course_code": "LIT200",
        "course_name": "Creative Writing",
        "CodeNName": "LIT200: Creative Writing"
      },
      {
        "course_code": "GEO101",
        "course_name": "Physical Geography",
        "CodeNName": "GEO101: Physical Geography"
      },
      {
        "course_code": "FIN302",
        "course_name": "Investments and Securities",
        "CodeNName": "FIN302: Investments and Securities"
      },
      {
        "course_code": "FRE101",
        "course_name": "French Language",
        "CodeNName": "FRE101: French Language"
      }
    ],
    "_id":"644520119787a6b4f51baccb",
    "name":"aaaaaaaaaaaaaaaaaaaa",
    "uniID":"asd",
    "gender":"Female",
    "email":"wangzhifang000@gmail.com",
    "faculty":"Education",
    "major":"Political Science",
    "authID":"auth0|6432cdf9ef4110c529909930",
    "userAvatar":"https://s.gravatar.com/avatar/aedd9141fa9a7ae6fb0ff3a52efc7884?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F16.png"
  }


  
export default function Recommendation() {

    const [recommand, setRecommand] = useState<IUserDetail[]>()
    const navigate = useNavigate()

    useEffect(() => {
        axios.post('http://localhost:8080/users/api/recomand',testData).then((res)=>{
            console.log(res.data)
            setRecommand(res.data)
        })
    }, [])


    const handleClick = (id:string)=>{
        navigate("/frienddetail/", { state: {id:id}})
    }

    return (
        <div>
                <h1>user u may know</h1>
                <Box sx={{ overflowX: 'auto', maxWidth: '100%', display: 'flex' }}>
                <List sx={{ display: 'flex', flexDirection: 'row' }}>
                    {recommand?.map(item => (
                    <Paper elevation={24} sx={{margin:'0.5em'}}>
                    <ListItem key={item._id} onClick={()=>handleClick(item._id)}>
                        <ListItemText
                        primary= {<div><Avatar src={item.userAvatar}/>{item.name}</div>}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {<><p>Email:</p>{item.email}</>}
                            </Typography>
                            {/* {" — I'll be in your neighborhood doing errands this…"} */}
                            
                            //TODO add a tag show how many same courses, or samr major
                        
                            </React.Fragment>
                        }
                        />
                    </ListItem>                        <Divider orientation="vertical" variant="middle" flexItem /></Paper>))}
                    <Paper elevation={24} sx={{margin:'0.5em'}}>

                    <ListItem >
                        <ListItemText
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            {"More USers"}
                            <ArrowCircleRightIcon/>
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    </Paper>
                </List>
                </Box>
        </div>
    )
}
