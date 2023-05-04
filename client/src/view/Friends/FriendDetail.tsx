import { Avatar, Box, Paper, Typography } from "@mui/material"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react"
import Joi from "joi"


export interface IFriendDetail {
    name: string
    uniID: string
    gender: string
    email: string
    faculty: string
    major: string
    userAvatar: string
}

interface IPayload {
    authID?: string
    friendID: string
}

export default function FriendDetail() {

    const location = useLocation()
    const [friendDetail, setFriendDetail] = React.useState<IFriendDetail>()
    const [follow, setFollow] = React.useState<Boolean>()
    const navigate = useNavigate()
    const [self, setSelf] = React.useState<Boolean>()
    const { user, isAuthenticated } = useAuth0();
    const {getAccessTokenSilently} = useAuth0()
    const payload: IPayload = {
        authID: user?.sub,
        friendID: location.state.id
    }
    const controller = new AbortController()


    async function getFriendDetail() {
        const dbData = await axios.get(`http://localhost:8080/friends/detail/${location.state.id}`, {signal: controller.signal})
        const dbDataValidate = Joi.object<IFriendDetail>({
            name: Joi.string().required(),
            uniID: Joi.string().required(),
            gender: Joi.string().required().allow(null, ''),
            email: Joi.string().required().allow(null, ''),
            faculty: Joi.string().required().allow(null, ''),
            major: Joi.string().required().allow(null, ''),
            userAvatar: Joi.string().required().allow(null, '')
        }).unknown(true).validate(dbData.data)
        if(dbDataValidate.error){
            console.error(dbDataValidate.error)
        }else{
            setFriendDetail(dbDataValidate.value)
        }
            const dbFollow: boolean = (await axios.post('http://localhost:8080/friends/checkfollow', payload,{signal: controller.signal})).data
            const dbFollowValidate = Joi.boolean().required().validate(dbFollow)
            if(dbFollowValidate.error){
                console.error(dbFollowValidate.error)
            }else{
                setFollow(dbFollowValidate.value)
            }
            const dbSelf: boolean = (await axios.post(`http://localhost:8080/friends/checkself`, payload,{signal: controller.signal})).data
            const dbSelfValidate = Joi.boolean().required().validate(dbSelf)
            if(dbSelfValidate.error){
                console.error(dbSelfValidate.error)
            }else{
                setSelf(dbSelfValidate.value)
            }

    }

    function handleReturn() {
        navigate(-1)
    }

    async function handleUnFollow() {
        const token = getAccessTokenSilently()
        await axios.post("http://localhost:8080/friends/delete", payload, {signal: controller.signal, headers: {Authorization: `Bearer ${token}`}})
        setFollow(false)
    }

    async function handleFollow() {
        await axios.post("http://localhost:8080/friends/add", payload, {signal: controller.signal})
        setFollow(true)
    }

    useEffect(() => {
        
        getFriendDetail()

        return () => {
            controller.abort()
        }
    }, [])

    return (
        <Paper elevation={24}>
        <Box>
        <div style={{ width: "80%", textAlign: "center", margin: "0 auto",paddingTop:"2em", paddingBottom:"2em", wordWrap:'break-word' }}>
            <div>
                <Avatar sx={{ width: 56, height: 56, margin: "0 auto" }}
                    src={friendDetail?.userAvatar} />
            </div>
            <div style={{ marginBottom: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    {friendDetail?.name}
                </Typography>
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
                <Typography variant="h6" gutterBottom>
                    UniID: {friendDetail?.uniID}
                </Typography>
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
            {friendDetail?.gender ?
                    <Typography variant="h6" gutterBottom>
                        Gender: {friendDetail?.gender}
                    </Typography>
                    :
                    <Typography variant="h6" gutterBottom>
                        Gender: Prefer Not To Tell
                    </Typography>
                }
            </div>
            <div style={{ textAlign: "left", width: "100%", marginBottom: "10px" }}>
            {friendDetail?.email ?
                    <Typography variant="h6" gutterBottom>
                        Email: {friendDetail?.email}
                    </Typography>
                    :
                    <Typography variant="h6" gutterBottom>
                        Email: Prefer Not To Tell
                    </Typography>
                }
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
            {friendDetail?.faculty ?
                    <Typography variant="h6" gutterBottom>
                        Faculty: {friendDetail?.faculty}
                    </Typography>
                    :
                    <Typography variant="h6" gutterBottom>
                        Faculty: Prefer Not To Tell
                    </Typography>
                }
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
                {friendDetail?.major ?
                    <Typography variant="h6" gutterBottom>
                        Major: { friendDetail?.major}
                    </Typography>
                    :
                    <Typography variant="h6" gutterBottom>
                        Major: Prefer Not To Tell
                    </Typography>
                }

            </div>
            <div>
                <Button variant="contained"
                    sx={{ width: "40%" }}
                    onClick={handleReturn}
                >
                    back
                </Button>
                {!self &&
                    (follow ?
                        <Button variant="contained"
                            sx={{ width: "40%", marginLeft: "10%" }}
                            onClick={handleUnFollow}
                        >
                            Unfollow
                        </Button>
                        :
                        <Button variant="contained"
                            sx={{ width: "40%", marginLeft: "10%" }}
                            onClick={handleFollow}
                        >
                            Follow
                        </Button>
                    )


                }
            </div>
             </div>
        </Box>
        </Paper>
        )
}