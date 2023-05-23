import { useEffect } from "react"
import React from "react"
import { socket } from "../view/SandBox"
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"



export interface INotification {
    _id: string,
    sender: string,
    receiver: string,
    senderName: string,
    senderPic: string,
    msg: string,
    sendTime: Date,
    type: string
}


export default function Notification() {
    const [notifications, setNotifications] = React.useState<INotification[]>([])
    const navigate = useNavigate()


    useEffect(() => {
        socket.on("getNotifications", (notifications: INotification[]) => {
            setNotifications(notifications)
        })
        socket.on("newNotification", (newNotification: INotification) => {
            setNotifications((notifications) => [newNotification, ...notifications])
        })
        socket.emit("getNotifications")

        return (
            () => {
                socket.off("getNotifications")
                socket.off("newNotification", (newNotification: INotification) => {
                    setNotifications((notifications) => [newNotification, ...notifications])
                })
                socket.emit("leaveNotification")
            }
        )
    }, [])

    const handleChat = (sender: string) => {
        navigate("/chat/", { state: { "id": sender } })
    }

    const handleDeleteAllFromSender = (sender: string, receiver: string, type: string) => {
        socket.emit("deleteAllMsgFromSender", sender, receiver, type)
    }

    const handleDeleteMsg = (id: string) => {
        socket.emit("deleteNotificationMsg", id)
    }

    const handleFriendProfile = (sender: string) => {
        navigate("/frienddetail/", { state: { "id": sender } })
    }

    const handleAcceptRequest = (sender: string) => {
        socket.emit("acceptRequest", sender)
    }

    const handleDenyRequest = (sender: string) => {
        socket.emit("denyRequest", sender)
    }

    const handleCancelRequest = (sender: string) => {
        socket.emit("cancelRequest", sender)
    }

    return (
        <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <div>
                <h1>Notifications</h1>
                <div>
                    <Box sx={{ p: 2 }}>
                        <Paper elevation={24}>
                            <TableContainer component={Paper} >
                                <Table>
                                    <TableBody>
                                        {notifications?.map((notification) => {
                                            if (notification.type == "msg") {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{ width: 20, cursor: "pointer" }} onClick={() => handleChat(notification.sender)}><Avatar alt="Remy Sharp" src={notification.senderPic} /></TableCell>
                                                        <TableCell style={{ width: 50, cursor: "pointer" }} onClick={() => handleChat(notification.sender)}>{notification.senderName}</TableCell>
                                                        <TableCell onClick={() => handleChat(notification.sender)} align="left" style={{ overflow: "hidden", maxWidth: 10, cursor: "pointer" }}>{notification.msg}</TableCell>
                                                        <TableCell onClick={() => handleChat(notification.sender)} style={{ width: 180, cursor: "pointer" }}>{dayjs(notification.sendTime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                                        <TableCell style={{ width: 100 }}><Button variant="contained" style={{ marginLeft: 10, width: 20 }} onClick={() => handleDeleteMsg(notification._id)}>Clear</Button></TableCell>
                                                    </TableRow>
                                                )
                                            } else if (notification.type == "request") {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{ width: 20, cursor: "pointer" }} onClick={() => handleFriendProfile(notification.sender)}><Avatar alt="Remy Sharp" src={notification.senderPic} /></TableCell>
                                                        <TableCell style={{ width: 50, cursor: "pointer" }} onClick={() => handleFriendProfile(notification.sender)}>{notification.senderName}</TableCell>
                                                        <TableCell onClick={() => handleFriendProfile(notification.sender)} align="left" style={{ overflow: "hidden", maxWidth: 10, cursor: "pointer" }}>{notification.msg}</TableCell>
                                                        <TableCell onClick={() => handleFriendProfile(notification.sender)} style={{ width: 180, cursor: "pointer" }}>{dayjs(notification.sendTime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                                        <TableCell style={{ width: 180 }}><Button variant="contained" style={{ marginLeft: 10, width: 20 }} onClick={() => handleAcceptRequest(notification.sender)}>Accept</Button><Button variant="contained" style={{ marginLeft: 10, width: 20 }} onClick={() => handleDenyRequest(notification.sender)}>Deny</Button></TableCell>
                                                    </TableRow>
                                                )
                                            } else if (notification.type == "pendingRequest") {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{ width: 20, cursor: "pointer" }} onClick={() => handleFriendProfile(notification.sender)}><Avatar alt="Remy Sharp" src={notification.senderPic} /></TableCell>
                                                        <TableCell style={{ width: 50, cursor: "pointer" }} onClick={() => handleFriendProfile(notification.sender)}>{notification.senderName}</TableCell>
                                                        <TableCell onClick={() => handleFriendProfile(notification.sender)} align="left" style={{ overflow: "hidden", maxWidth: 10, cursor: "pointer" }}>{notification.msg}</TableCell>
                                                        <TableCell onClick={() => handleFriendProfile(notification.sender)} style={{ width: 180, cursor: "pointer" }}>{dayjs(notification.sendTime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                                        <TableCell style={{ width: 100 }}><Button variant="contained" style={{ marginLeft: 10, width: 20 }} onClick={() => handleCancelRequest(notification.sender)}>Cancel</Button></TableCell>
                                                    </TableRow>
                                                )
                                            } else if(notification.type == "newFriend") {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{ width: 20, cursor: "pointer" }} onClick={() => handleChat(notification.sender)}><Avatar alt="Remy Sharp" src={notification.senderPic} /></TableCell>
                                                        <TableCell style={{ width: 50, cursor: "pointer" }} onClick={() => handleChat(notification.sender)}>{notification.senderName}</TableCell>
                                                        <TableCell onClick={() => handleChat(notification.sender)} align="left" style={{ overflow: "hidden", maxWidth: 10, cursor: "pointer" }}>{notification.msg}</TableCell>
                                                        <TableCell onClick={() => handleChat(notification.sender)} style={{ width: 180, cursor: "pointer" }}>{dayjs(notification.sendTime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                                        <TableCell style={{ width: 100 }}><Button variant="contained" style={{ marginLeft: 10, width: 20 }} onClick={() => handleDeleteMsg(notification._id)}>Clear</Button></TableCell>
                                                    </TableRow>
                                                )
                                            } else if(notification.type == "refused") {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{ width: 20, cursor: "pointer" }} onClick={() => handleFriendProfile(notification.sender)}><Avatar alt="Remy Sharp" src={notification.senderPic} /></TableCell>
                                                        <TableCell style={{ width: 50, cursor: "pointer" }} onClick={() => handleFriendProfile(notification.sender)}>{notification.senderName}</TableCell>
                                                        <TableCell onClick={() => handleFriendProfile(notification.sender)} align="left" style={{ overflow: "hidden", maxWidth: 10, cursor: "pointer" }}>{notification.msg}</TableCell>
                                                        <TableCell onClick={() => handleFriendProfile(notification.sender)} style={{ width: 180, cursor: "pointer" }}>{dayjs(notification.sendTime).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                                        <TableCell style={{ width: 100 }}><Button variant="contained" style={{ marginLeft: 10, width: 20 }} onClick={() => handleDeleteMsg(notification._id)}>Clear</Button></TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>
                </div>
            </div>
        </div>
    )
}