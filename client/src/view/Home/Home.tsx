import { StyledContainer } from "../Profile/Profile";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from "react-router-dom";



export default function Home() {


    const navigate = useNavigate()


    const handleSearch = () => {
        navigate("/search")
    }

    const handleFriends = () => {
        navigate("/friends")
    }

    const handleNotification = () => {
        navigate("/notification")
    }

    const handleProfile = () => {
        navigate("/profile")
    }


    return (
        <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <div>
                <h1>Things you might want to do</h1>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 150 }}>
                    <div style={{ margin: "0 auto 0 auto", cursor: "pointer" }} onClick={handleSearch}>
                        <PersonSearchIcon style={{ fontSize: 200 }} /><br />
                        <b>Find new friends</b>
                    </div>
                    <div style={{ margin: "0 auto 0 auto", cursor: "pointer" }} onClick={handleFriends}>
                        <ChatIcon style={{ fontSize: 200 }} /><br />
                        <b>Chat with friends</b>
                    </div>
                    <div style={{ margin: "0 auto 0 auto", cursor: "pointer" }} onClick={handleNotification}>
                        <NotificationsNoneIcon style={{ fontSize: 200 }} /><br />
                        <b>Check notifications</b>
                    </div>
                    <div style={{ margin: "0 auto 0 auto", cursor: "pointer" }} onClick={handleProfile}>
                        <AccountBoxIcon style={{ fontSize: 200 }} /><br />
                        <b>Edit profile</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
