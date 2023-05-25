import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material"
import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react"
import Joi from "joi"
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { dividerClasses } from "@mui/joy"
import BlockIcon from '@mui/icons-material/Block';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';



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
    friendID: string | null
}


export default function FriendDetail() {


    const location = useLocation()
    const [friendDetail, setFriendDetail] = React.useState<IFriendDetail>()
    const [follow, setFollow] = React.useState<Boolean>()
    const navigate = useNavigate()
    const [self, setSelf] = React.useState<Boolean>()
    const { user, isAuthenticated } = useAuth0();

    const searchParams = new URLSearchParams(location.search);
    const friendId = searchParams.get('id');

    const [loading, setLoading] = React.useState(false);

    const { getAccessTokenSilently } = useAuth0()



    const payload: IPayload = {
        authID: user?.sub,
        friendID: location.state.id,
    }
    const controller = new AbortController()


    async function getFriendDetail() {
        const token = await getAccessTokenSilently()
        const dbData = await axios.get(`http://localhost:8080/friends/detail/${location.state.id}`, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } })
        const dbDataValidate = Joi.object<IFriendDetail>({
            name: Joi.string().required(),
            uniID: Joi.string().required(),
            gender: Joi.string().required().allow(null, ''),
            email: Joi.string().required().allow(null, ''),
            faculty: Joi.string().required().allow(null, ''),
            major: Joi.string().required().allow(null, ''),
            userAvatar: Joi.string().required().allow(null, '')
        }).unknown(true).validate(dbData.data)
        if (dbDataValidate.error) {
            console.error(dbDataValidate.error)
        } else {
            setFriendDetail(dbDataValidate.value)
            console.log(friendDetail)
        }
        const dbFollow: boolean = (await axios.post('http://localhost:8080/friends/checkfollow', payload, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } })).data
        const dbFollowValidate = Joi.boolean().required().validate(dbFollow)
        if (dbFollowValidate.error) {
            console.error(dbFollowValidate.error)
        } else {
            setFollow(dbFollowValidate.value)
        }
        const dbSelf: boolean = (await axios.post(`http://localhost:8080/friends/checkself`, payload, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } })).data
        const dbSelfValidate = Joi.boolean().required().validate(dbSelf)
        if (dbSelfValidate.error) {
            console.error(dbSelfValidate.error)
        } else {
            setSelf(dbSelfValidate.value)
        }

    }

    function handleReturn() {
        navigate(-1)
    }

    async function handleUnFollow() {
        const token = await getAccessTokenSilently()

        console.log('token', token)

        await axios.post("http://localhost:8080/friends/delete", payload, {
            signal: controller.signal,
            headers: { Authorization: `Bearer ${token}` }
        })
        setFollow(false)
    }

    async function handleFollow() {
        setLoading(true);

        const token = await getAccessTokenSilently()
        await axios.post("http://localhost:8080/friends/add", payload, { signal: controller.signal, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
            console.log(res.status)
            setLoading(false);

        })


        setFollow(true)

    }

    useEffect(() => {
        console.log(location)
        getFriendDetail()

        return () => {
            controller.abort()
        }
    }, [])

    return (

        <Paper elevation={24} sx={{ padding: "2em", width: "80%", margin: "0 auto", position: "relative" }}>
            <IconButton color="primary" onMouseOver={(e) => e.currentTarget.style.color = "#808080"} onMouseOut={(e) => e.currentTarget.style.color = "primary"} onClick={handleReturn} sx={{ position: "absolute", top: "10px", left: "10px" }}>
                <ArrowBackIcon fontSize="large" />
            </IconButton>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: '1em' }}>
                <Avatar sx={{ width: 56, height: 56, marginTop: "1em" }} src={friendDetail?.userAvatar} />
                <Typography style={{ fontSize: '24px', fontWeight: 600, color: '#3f51b5', marginTop: "1em" }}>
                    {friendDetail?.name}
                </Typography>
                {!self &&
                    <Box sx={{ marginTop: "1em" }}>
                        {follow ?
                            <Button variant="contained" onClick={handleUnFollow} startIcon={<BlockIcon />}
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    borderRadius: "1em",
                                    textTransform: "none",
                                    '&:hover': {
                                        bgcolor: "primary.dark",
                                        transition: "0.3s",
                                    }
                                }}
                            >
                                Unfollow
                    </Button>
                            :
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                startIcon={<AddIcon />}
                                onClick={handleFollow}
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    borderRadius: "1em",
                                    textTransform: "none",
                                    '&:hover': {
                                        bgcolor: "primary.dark",
                                        transition: "0.3s",
                                    }
                                }}
                            >
                                Follow
                    </LoadingButton>
                        }
                    </Box>
                }
            </Box>
            <Box sx={{ marginBottom: "1em", display: "flex", alignItems: "center", gap: 2 }}>
                <AccountCircleIcon sx={{ marginRight: "0.5em" }} />
                <Typography variant="body1" component="span" gutterBottom style={{ fontWeight: 600 }}>
                    UniID:
                </Typography>
                <Typography variant="body1" component="span" gutterBottom style={{ color: '#3f51b5', fontSize: '1.2rem', wordBreak: "break-word" }}>
                    {friendDetail?.uniID}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: "1em", display: "flex", alignItems: "center", gap: 2 }}>
                <WcIcon sx={{ marginRight: "0.5em" }} />
                <Typography variant="body1" component="span" gutterBottom style={{ fontWeight: 600 }}>
                    Gender:
                </Typography>
                <Typography variant="body1" component="span" gutterBottom style={{ color: '#3f51b5', fontSize: '1.2rem', wordBreak: "break-word" }}>
                    {friendDetail?.gender || 'Prefer Not To Tell'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: "1em", display: "flex", alignItems: "center", gap: 2 }}>
                <EmailIcon sx={{ marginRight: "0.5em" }} />
                <Typography variant="body1" component="span" gutterBottom style={{ fontWeight: 600 }}>
                    Email:
                </Typography>
                <Typography variant="body1" component="span" gutterBottom style={{ color: '#3f51b5', fontSize: '1.2rem', wordBreak: "break-word" }}>
                    {friendDetail?.email || 'Prefer Not To Tell'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: "1em", display: "flex", alignItems: "center", gap: 2 }}>
                <SchoolIcon sx={{ marginRight: "0.5em" }} />
                <Typography variant="body1" component="span" gutterBottom style={{ fontWeight: 600 }}>
                    Faculty:
                </Typography>
                <Typography variant="body1" component="span" gutterBottom style={{ color: '#3f51b5', fontSize: '1.2rem', wordBreak: "break-word" }}>
                    {friendDetail?.faculty || 'Prefer Not To Tell'}
                </Typography>
            </Box>
            <Box sx={{ marginBottom: "1em", display: "flex", alignItems: "center", gap: 2 }}>
                <LocalLibraryIcon sx={{ marginRight: "0.5em" }} />
                <Typography variant="body1" component="span" gutterBottom style={{ fontWeight: 600 }}>
                    Major:
                </Typography>
                <Typography variant="body1" component="span" gutterBottom style={{ color: '#3f51b5', fontSize: '1.2rem', wordBreak: "break-word" }}>
                    {friendDetail?.major || 'Prefer Not To Tell'}
                </Typography>
            </Box>



        </Paper>



    )
}