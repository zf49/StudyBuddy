import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

import Avatar from '@mui/material/Avatar';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Joi from 'joi';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }));

export interface IFriend {
    name: string
    uniID: string
    ID: string
    avatar: string
}


export default function Friends() {

    const { user, isAuthenticated } = useAuth0();
    const [friends, setFriends] = React.useState<IFriend[]>()
    const navigate = useNavigate()
    const controller = new AbortController()
    const {getAccessTokenSilently} = useAuth0()

    async function getFriends() {
        if (user) {
            const token = await getAccessTokenSilently()
            const dbData = await axios.get(`http://localhost:8080/friends/getfriends`,{signal: controller.signal, headers: {Authorization: `Bearer ${token}`}})
            const dbDataValidate = Joi.array().items(
                Joi.object<IFriend>({
                name: Joi.string().required(),
                uniID: Joi.string().required(),
                ID: Joi.string().required(),
                avatar: Joi.string().required()
                })
            ).validate(dbData.data)
            if(dbDataValidate.error){
                console.error(dbDataValidate.error)
            }else{
                setFriends(dbDataValidate.value)
            }
        }
    }

    function handleFriendDetail(id: string) {
        navigate("/chat/", { state: { "id": id }})
    }

    useEffect(() => {
        getFriends()

        return () =>{
            controller.abort()
        }
    }, [])


    return (
    <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
          <div>
            <h1>My Friends</h1>   
            <div> 
            <Box sx={{ p: 2 }}>
                <Paper elevation={24}>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>UniID</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {friends?.map((friend) => (
                        <TableRow key={friend.ID} onClick={() => handleFriendDetail(friend.ID)}>
                            <TableCell><Avatar alt="Remy Sharp" src={friend.avatar} /></TableCell>
                            <TableCell>{friend.name}</TableCell>
                            <TableCell>{friend.uniID}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Paper>
            </Box>
            </div>
        </div>
    </div>
       
    )
}

