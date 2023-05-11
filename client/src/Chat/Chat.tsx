import { useAuth0 } from "@auth0/auth0-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../Router/IndexRouter";
import React from "react";
import TextField from '@mui/material/TextField';
import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

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
    const msgBoxRef = useRef<null | HTMLDivElement>(null)

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
        console.log(msgBoxRef)
        setTimeout(() => {
            msgBox?.scroll(0, msgBox.scrollHeight)
        }, 100)
        // msgBoxRef.current?.scrollIntoView({block: "start"})
        console.log("scroll")

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
                                    <div style={{ display: "inline" }}>
                                        <Avatar alt="Remy Sharp" src={msg.senderPic} />
                                        {msg.senderName}
                                        {msg.sendTime.toString()}
                                    </div>
                                    <div>
                                        {msg.msg}
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
                        sx={{ marginTop: "5vh", borderRadius: 1, border: 1}}
                    />
                </div>
                : <div>You're not friends yet</div>}
        </div>
    )




}