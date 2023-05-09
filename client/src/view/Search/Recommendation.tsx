import React, { useEffect, useState } from 'react'

import { Avatar, Box, Divider, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { IUserDetail } from '../Profile/Profile';
import { useNavigate } from 'react-router';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useAuth0 } from '@auth0/auth0-react';




export default function Recommendation() {

  const [recommand, setRecommand] = useState<IUserDetail[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
      console.log(user?.sub)
    axios
      .post("http://localhost:8080/users/api/recomand", 
            {"authID":user?.sub,
             "page":0
            })
      .then((res) => {
        console.log(res.data);
        setRecommand(res.data);
      });
  }, []);

  const handleClick = (id: string) => {
      console.log(id)
      navigate("/frienddetail", { state: { "id": id }})
    };

    return (
        <div style={{marginBottom:"0.5em"}}>
                <h3>users u may know</h3>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {recommand?.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4}sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} key={index} onClick={()=>handleClick(item._id)}>
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

// const Recommendations = () => {
//     const [recommendations, setRecommendations] = useState<IUserDetail[]>([]);
//     const [page, setPage] = useState<number>(1);
//     const [displayedUsers, setDisplayedUsers] = useState<IUserDetail[]>([]);
//     const { user } = useAuth0();
//   const navigate = useNavigate();
//     const [flag, setFlag] = useState(true)
  
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             await axios.post(`http://localhost:8080/users/api/recommendations/${page}`,{"authID":user?.sub}).then((res)=>{
//                 // if(res.data===[]){
//                 //     setFlag(false)
//                 // }

//                 res.data.length===0?setFlag(false):setFlag(true)
//             // console.log(res.data)
//             setRecommendations((prev) => [...prev, ...res.data]);
//             // console.log(recommendations)
//             })
            
//           } catch (err) {
//             console.log(err);
//           }
//         };
//         fetchData()
//       }, [page])
  
//       const handleClick = () => {
//         const usersToShow = recommendations.slice(0, 3);
//         setDisplayedUsers((prev) => [...prev, ...usersToShow]);
//         setRecommendations((prev) => prev.slice(3));
//         setPage(page+1)
//       };
  
//       const handleRedirect = (id: string)=>{
//             navigate("/frienddetail/", { state: { id: id } });
//       }

//     return (
//         <>
//         <h3>Users You May Know</h3>
        
//         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                  {displayedUsers?.map((item, index) => (
//                     <Grid item xs={2} sm={4} md={4}sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} key={index} 
//                     onClick={()=>handleRedirect(item._id)}
//                     >
//                     <Paper elevation={1}>
//                         <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                         <ListItemAvatar sx={{ alignSelf: 'center' }}>
//                             <Avatar src={item.userAvatar} />
//                         </ListItemAvatar>
//                         <ListItemText
//                             primary={item.name}
//                             sx={{ textAlign: 'center' }}
//                         />
//                         <ListItemText
//                             primary={item.courses.length>0?"Same course":"Same Major"}
                            
//                             secondary={item.courses.length>0?item.courses.map((item)=>{
//                                 return <>{item.course_code+","}</>
//                             }):item.major}
//                         />
//                         </List>                                
//                     </Paper>
//                     </Grid>                      
//                 ))}
//             </Grid>




//           {page===1?
//             <Button onClick={handleClick} style={{ marginTop: "20px" }}>
//               check
//             </Button>: flag===false?<></>:<Button onClick={handleClick} style={{ marginTop: "20px" }}>
//               Load More
//             </Button>
//           }
       
//       </>
//     );
//   };
  
//   export default Recommendations;