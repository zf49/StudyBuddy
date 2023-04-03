import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SideBar from './SideBar';
import PetsIcon from '@mui/icons-material/Pets';
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";






const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function TopBar() {

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useAuth0();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const redirectToProfile = ()=>{
    console.log('MyAccount')
    navigate('/profile')
    handleClose()
  }

  const logOut = ()=>{
    console.log('log out')
    logout({ logoutParams: { returnTo: window.location.origin } })
    localStorage.removeItem('token')
    handleClose()

  }

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{
              // console.log('123')
            }}>
              <SideBar/>
            </IconButton>


          <Typography variant="h6" className={classes.title} style={{
            textAlign:'center'
          }}>
            <PetsIcon/>
          </Typography>
          {auth && (
            <div className="123">
               <Typography variant="h6" className={classes.title} style={{
          }}>
            
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{
                  redirectToProfile()
                }} >My account</MenuItem>

                <MenuItem onClick={()=>{
                  logOut()
                }}>Log out</MenuItem>
              </Menu>
              
          </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}