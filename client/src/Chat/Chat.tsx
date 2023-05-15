import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../Router/IndexRouter";
import React from "react";
import TextField from '@mui/material/TextField';
import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from "dayjs";

export interface IMsg {
    sender: string,
    receiver: string,
    senderName: string,
    senderPic: string,
    sendTime: Date,
    msg: string
}

export interface IPayload {
    friendID: string,
    msg: string
}

export default function Chat() {

    const { getAccessTokenSilently } = useAuth0()
    const location = useLocation()
    const [friendStatus, setFriendStatus] = React.useState<boolean>(false)
    const [msgs, setMsgs] = React.useState<IMsg[]>([])
    const [msg, setMsg] = React.useState<string>()
    const [friendName, setFriendName] = React.useState<string>()
    const navigate = useNavigate()

    useEffect(() => {
        async function getChat() {
            const token = await getAccessTokenSilently()
            const friendID = location.state.id
            socket.emit("startChat", friendID)
            socket.on("notFriends", () => {
                setFriendStatus(false)
            })
            socket.on("friends", (msgs, friendName) => {
                setFriendStatus(true)
                setMsgs(msgs)
                setFriendName(friendName)
            })
            socket.on("newMsg", (newMsg: IMsg) => {
                setMsgs((msgs) => [...msgs, newMsg])
            })

        }
        getChat()
        return (
            () => {
                socket.off("notFriends")
                socket.off("friends")
                socket.off("newMsg")
                socket.emit("leaveChat")
            }

        )
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    const handleMsg = (event: ChangeEvent<HTMLInputElement>) => {
        setMsg(event.target.value)
    }

    const handleSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const payload = {
                friendID: location.state.id,
                msg: msg
            }
            socket.emit("sendMsg", payload)
            setMsg("")
        }
    }

    const scrollToBottom = () => {
        const msgBox = document.getElementById("msgBox")
        msgBox?.scroll(0, msgBox.scrollHeight)

    }

    const handleProfile = () => {
        navigate("/frienddetail/", { state: { "id": location.state.id } })
    }

    return (
        <div style={{ height: "100%" }}>
            {friendStatus ?
                // <div>
                //     <TextField
                //             id="msg"
                //             onChange={handleMsg}
                //             onKeyDown={handleSend}
                //             fullWidth
                //         />
                // </div> 
                <div>
                    <div style={{ textAlign: "center" }}>
                        <h1>
                            {friendName}
                        </h1>
                    </div>
                    <Paper elevation={24}>
                        <div id="msgBox" style={{ height: "70vh", overflow: "scroll", padding: 20 }}>
                            {msgs?.map((msg) => (
                                <div>
                                    <div style={{ display: "flex" }}>
                                        <div>
                                            <Avatar src={msg.senderPic} onClick={handleProfile} style={{ cursor: "pointer" }} />
                                        </div>
                                        <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                                            <b style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleProfile}>{msg.senderName}</b>
                                        </div>
                                        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                                            <small style={{ color: "gray" }}>{dayjs(msg.sendTime).format("DD/MM/YYYY HH:mm:ss")}</small>
                                        </div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "16px" }}>{msg.msg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Paper>
                    <TextField
                        id="msg"
                        onChange={handleMsg}
                        onKeyDown={handleSend}
                        value={msg}
                        label="Type Message Here"
                        fullWidth
                        sx={{ marginTop: "5vh", borderRadius: 1, border: 1 }}
                    />
                </div>
                : <div>You're not friends yet</div>}
        </div>
    )




}