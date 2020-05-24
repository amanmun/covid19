import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import * as Icon from 'react-feather';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemText, useTheme, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  title: {
    flexGrow: 1,
    fontWeight: "900",
    color: theme.palette.text.secondary,
  },
  appbar: {
    textAlign: "center",
  },
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  appbart: {
    fontFamily: "IBM Plex Sans",
    fontWeight: "900",
    paddingTop: "30px",
    paddingBottom: "30px",
    color: theme.palette.text.secondary
  },
  link: {
    textDecoration: "none",
    fontFamily: "IBM Plex Sans",
    fontWeight: "900",
  },
  listitem: {
    color: theme.palette.text.secondary,
    fontSize: 24,
    padding: 8,
    fontFamily: "IBM Plex Sans",
    fontWeight: "900",
  }
}));

export default function Appbar(props) {

  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={props.toggleDarkMode} className={classes.listitem}>
          {theme.palette.type === "light"
            ? <ListItemText><Icon.Moon />
            </ListItemText>
            : <ListItemText><Icon.Sun />
            </ListItemText>}
        </ListItem>
        <ListItem style={{ textAlign: "left" }}>
          <ListItemText>
            <Typography variant="h5" className={classes.appbart}>COVID 19<br></br>INDIA<br></br>TRACKER</Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <Link to={process.env.PUBLIC_URL + '/'} onClick={toggleDrawer(false)} className={classes.link}>
          <ListItem button className={classes.listitem} >
            <Icon.Home />
            <ListItemText>
              <Typography variant="h4" className={classes.listitem}>Home</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to={process.env.PUBLIC_URL + '/Testing'} onClick={toggleDrawer(false)} className={classes.link}>
          <ListItem button className={classes.listitem} >
            <Icon.Activity />
            <ListItemText>
              <Typography variant="h4" className={classes.listitem}>Test Stats</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to={process.env.PUBLIC_URL + '/Essentials'} onClick={toggleDrawer(false)} className={classes.link}>
          <ListItem button className={classes.listitem} >
            <Icon.Archive />
            <ListItemText>
              <Typography variant="h4" className={classes.listitem}>Essentials</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to={process.env.PUBLIC_URL + '/Symptoms'} onClick={toggleDrawer(false)} className={classes.link}>
          <ListItem button className={classes.listitem} >
            <Icon.Book />
            <ListItemText>
              <Typography variant="h4" className={classes.listitem}>Learn More</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <Link to={process.env.PUBLIC_URL + '/About'} onClick={toggleDrawer(false)} className={classes.link}>
          <ListItem button className={classes.listitem} >
            <Icon.HelpCircle />
            <ListItemText>
              <Typography variant="h4" className={classes.listitem}>About</Typography>
            </ListItemText>
          </ListItem>
        </Link>
        <ListItem button onClick={toggleDrawer(false)} className={classes.listitem}>
          <Icon.X />
          <ListItemText>
            <Typography variant="h4" className={classes.listitem}>Close</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

  const theme = useTheme()
  return (
    <AppBar className={classes.appbar} position="static" elevation={0} color="inherit">
      <Toolbar>
        <React.Fragment key={"left"}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toggleDrawer("left", true)}>
            <Icon.AlignLeft />
          </IconButton>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
        <Typography variant="h6" className={classes.title}>
          COVID 19 INDIA TRACKER
        </Typography>
        <IconButton onClick={props.toggleDarkMode}>{theme.palette.type === "light" ? <Icon.Moon /> : <Icon.Sun />}</IconButton>
      </Toolbar>
    </AppBar>
  )
}