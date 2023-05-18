
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Paper, List, ListItemAvatar, Avatar, ListItemText, ListItem } from "@mui/material";
import { IUserDetail } from "../Profile/Profile";

export default function Recommendation() {
  const [recommand, setRecommand] = useState<IUserDetail[]>([]);
  const navigate = useNavigate();
  const { user ,getAccessTokenSilently} = useAuth0();

  useEffect(() => {



      console.log(user?.sub)
    const setReocmmand = async()=>{
        const token = await getAccessTokenSilently()
        axios
        .post("http://localhost:8080/users/api/recomand",{authID: user?.sub, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
          console.log(res.data);
          setRecommand(res.data);
        });

    }

    




  }, []);

  const handleClick = (id: string) => {
    console.log(id);
    navigate("/frienddetail", { state: { id: id } });
  };

  return (
    <div style={{ marginBottom: "0.5em" }}>
      <h3>users u may know</h3>
      <div style={{ overflow: "auto", maxHeight: "450px" }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {recommand?.map((item, index) => (
            <Grid item key={index} xs={2} sm={4} md={4} sx={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", height: "150px" }}
            onClick={()=>handleClick(item._id)}
            >
              <Paper elevation={1}>
                <List sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Avatar src={item.userAvatar}  sx={{ alignSelf: "center" }}/>
                  <ListItemText primary={item.name} sx={{ textAlign: "center" }} />
                  <ListItemText primary={item.matchedCount > 0 ? "Same course" : "Same Major"} secondary={item.matchedCount > 0 ? item.courses.map((item) => <>{item.course_code + ","}</>) : item.major} />
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
