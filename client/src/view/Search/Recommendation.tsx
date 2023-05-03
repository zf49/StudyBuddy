import React, { useEffect, useState } from 'react'

import { Avatar, Box, Divider, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import { IUserDetail } from '../Profile/Profile';
import { useNavigate } from 'react-router';
import ListItemAvatar from '@mui/material/ListItemAvatar';

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
        // {
        //     "course_code": "COM100",
        //     "course_name": "Public Speaking",
        //     "CourseNName": "COM100: Public Speaking"
        //   },
        //   {
        //     "course_code": "HIS220",
        //     "course_name": "American History",
        //     "CourseNName": "HIS220: American History"
        //   },
          {
            "course_code": "MAT110",
            "course_name": "Calculus I",
            "CourseNName": "MAT110: Calculus I"
          },
        {
            "course_code": "ART210",
            "course_name": "Oil Painting",
            "CourseNName": "ART210: Oil Painting"
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
        <div style={{marginBottom:"0.5em"}}>
                <h3>users u may know</h3>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {recommand?.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} onClick={()=>handleClick(item._id)}>
                    <Paper elevation={1}>
                        <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <ListItemAvatar sx={{ alignSelf: 'center' }}>
                            <Avatar src={item.userAvatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            sx={{ textAlign: 'center' }}
                        />
                        <ListItemText
                            primary={item.courses.length>0?"Same course":"Same Major"}
                            sx={{ textAlign: 'center' }}
                            secondary={item.courses.length>0?item.courses.map((item)=>{
                                return <>{item.course_code+","}</>
                            }):item.major}
                        />
                        </List>                                
                    </Paper>
                    </Grid>                      
                ))}
                </Grid>
        </div>
    )
}
