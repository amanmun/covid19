import React from 'react';
import { useState } from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider, responsiveFontSizes} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Appbar from './Appbar';
import Testing from './Testing';
import Symptoms from './Symptoms';
import About from './About';
import Essentials from './Essentials';

const themeobject = {
    palette: {
        type: "light",
        background: {
            paper:"#ffffff",
        }
    },
}

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.action.active
    },
    root: {
        flexGrow: 1,
        color: theme.palette.action.active,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: "900",
    },
    appbar: {
        textAlign: "center",
    },
}));
const useDarkMode = () => {
    const [theme, setTheme] = useState(themeobject)

    const { palette: { type } } = theme;
    const toggleDarkMode = () => {
        const updatedTheme = {
            ...theme,
            palette: {
                ...theme.palette,
                type: type === "light" ? "dark" : "light",
                text: {
                    secondary:type==="light"?"#eeeeee":"#455a64",
                    primary:type==="light"?"#eeeeee":"#455a64" 
                },
                background: {
                    paper:type==="light"?"#000015":"#ffffff",
                    defaul:type==="light"?"#000015":"#ffffff",
                }
            }
        }
        setTheme(updatedTheme)
    }
    return [theme, toggleDarkMode]
}

const Hometheme = () => {
    const [theme, toggleDarkMode] = useDarkMode();
    let themeconfig = createMuiTheme(theme);
    themeconfig = responsiveFontSizes(themeconfig);
    const classes = useStyles();

    return (

        <MuiThemeProvider theme={themeconfig}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <div className={classes.root}>
                        <Appbar toggleDarkMode={toggleDarkMode} />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/Testing' component={Testing} />
                            <Route path='/Essentials' component={Essentials} />
                            <Route path='/Symptoms' component={Symptoms} />
                            <Route path='/About' component={About} />
                        </Switch>
                </div>
            </Paper >
        </MuiThemeProvider >
    );
}
export default Hometheme;
