import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { Typography, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Joi from 'joi';

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

    async function getFriends() {
        if (user) {
            const dbData = await axios.get(`http://localhost:8080/friends/${user.sub}`)
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
        navigate("/frienddetail/", { state: { "id": id } })
    }

    useEffect(() => {
        getFriends()
    }, [])


    return (
        <div style={{ textAlign: "center", margin: "0 auto" }}>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Typography variant="h6" gutterBottom>
                    Friends
                </Typography>
            </div>
            <div>
                {friends?.map((friend: IFriend) => (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start" onClick={() => handleFriendDetail(friend.ID)}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={friend.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={friend.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {'UniID: '}
                                        </Typography>
                                        {friend.uniID}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                ))}
            </div>
        </div>
    )
}

