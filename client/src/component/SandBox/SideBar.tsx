import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu'
import Diversity1Icon from '@mui/icons-material/Diversity1';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor =  'left';

export default function SideBar() {

  const navigate = useNavigate();

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'left',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home','Search', 'Fellowing',].map((text, index) => (
          <ListItem button key={text} onClick={()=>{
            console.log(text)
            navigate(`/${text.toLowerCase()}`)
          }}>



            <ListItemIcon>{
            index === 0 ? <HomeIcon /> : index===1?<SearchIcon/>:<Diversity1Icon/>

            }</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </div>
  );

  return (
    <div>
      {(['left'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          
          <MenuIcon onClick={toggleDrawer(anchor, true)}/>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}