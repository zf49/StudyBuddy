import { Avatar, Typography } from "@mui/material"
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
    const payload: IPayload = {
        authID: user?.sub,
        friendID: location.state.id
    }


    async function getFriendDetail() {
        const dbData = await axios.get(`http://localhost:8080/friends/detail/${location.state.id}`)
        const dbDataValidate = Joi.object<IFriendDetail>({
            name: Joi.string().required(),
            uniID: Joi.string().required(),
            gender: Joi.string().allow(null, ''),
            email: Joi.string().allow(null, ''),
            faculty: Joi.string().allow(null, ''),
            major: Joi.string().allow(null, ''),
            userAvatar: Joi.string().allow(null, '')
        }).unknown(true).validate(dbData.data)
        if(dbDataValidate.error){
            console.error(dbDataValidate.error)
        }else{
            setFriendDetail(dbDataValidate.value)
        }
            const dbFollow: boolean = (await axios.post('http://localhost:8080/friends/checkfollow', payload)).data
            const dbFollowValidate = Joi.boolean().required().validate(dbFollow)
            if(dbFollowValidate.error){
                console.error(dbFollowValidate.error)
            }else{
                setFollow(dbFollowValidate.value)
            }
            const dbSelf: boolean = (await axios.post(`http://localhost:8080/friends/checkself`, payload)).data
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
        await axios.post("http://localhost:8080/friends/delete", payload)
        setFollow(false)
    }

    async function handleFollow() {
        await axios.post("http://localhost:8080/friends/add", payload)
        setFollow(true)
    }

    useEffect(() => {
        getFriendDetail()
    }, [])

    return (
        <div style={{ width: "60%", textAlign: "center", margin: "0 auto" }}>
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
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
                    UniID:{friendDetail?.uniID}
                </Typography>
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
                <Typography variant="h6" gutterBottom>
                    Gender:{friendDetail?.gender}
                </Typography>
            </div>
            <div style={{ textAlign: "left", width: "100%", marginBottom: "10px" }}>
                <Typography variant="h6" gutterBottom sx={{ maxWidth: "10px" }}>
                    Email:{friendDetail?.email}
                </Typography>
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
                <Typography variant="h6" gutterBottom>
                    Faculty:{friendDetail?.faculty}
                </Typography>
            </div>
            <div style={{ textAlign: "left", marginBottom: "10px" }}>
                <Typography variant="h6" gutterBottom>
                    Major:{friendDetail?.major}
                </Typography>
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




        </div>)
}