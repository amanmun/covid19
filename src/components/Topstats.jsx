import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Icon from 'react-feather';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { formatNumber } from './commonFunc/formatNumber';

const useStyles = makeStyles((theme) => ({
    tbcnfd: {
        color: theme.palette.error.main,
    },
    tbactv: {
        color: theme.palette.primary.main
    },
    tbrcvd: {
        color: theme.palette.success.main
    },
    tbdcsd: {
        color: theme.palette.text.secondary
    }
}));

function gridItem(data1, data2, classname, name1, name2) {
    return (
        <Grid item>
            <Paper elevation={0} align="center" className={classname}>
                <Typography variant="button">
                    {window.innerWidth > "768" ? name1 : name2}
                </Typography>
                <Typography variant="h6">
                    {formatNumber(data1)}
                </Typography>
                <Typography variant="button">
                    {data2!==0?<Icon.ArrowUp size="12" />:""}{data2 !== 0 ? formatNumber(data2) : ''}
                </Typography>
            </Paper>
        </Grid>
    )
}

function Topstats({ data: { data1_cts, data1_s } }) {
    const classes = useStyles();

    if (!data1_s) {
        return (
            <div>
            </div>
        );
    }
    else {
        
        return (
            <Box>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    {gridItem(data1_s[0].confirmed, data1_s[0].deltaconfirmed, classes.tbcnfd, "confirmed", "cnfd")}
                    {gridItem(data1_s[0].active, 0, classes.tbactv, "active", "actv")}
                    {gridItem(data1_s[0].recovered, data1_s[0].deltarecovered, classes.tbrcvd, "recovered", "rcvrd")}
                    {gridItem(data1_s[0].deaths, data1_s[0].deltadeaths, classes.tbdcsd, "deceased", "dcsd")}
                </Grid>
            </Box>
        );
    }
}
export default Topstats;