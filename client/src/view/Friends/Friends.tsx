import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

import Avatar from '@mui/material/Avatar';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

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

    async function getFriends() {
        if (user) {
            const dbData = await axios.get(`http://localhost:8080/friends/${user.sub}`,{signal: controller.signal})
            setFriends(dbData.data)
        }
    }

    function handleFriendDetail(id: string) {
        navigate("/frienddetail/", { state: { "id": id }})
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
                <TableContainer component={Paper}>
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
                </TableContainer>
             </Box>
         </div>
         </div>
         </div>
       
    )
}

