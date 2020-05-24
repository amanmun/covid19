import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { formatNumber } from './commonFunc/formatNumber';
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
    tbtstd: {
        color: theme.palette.warning.main,
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
                    {data1 !== '' ? formatNumber(data1) : 'Not Available'}
                </Typography>
                <Typography variant="button">
                    {data2 !== 0 ? '[+' + formatNumber(data2) + ']' : ''}
                </Typography>
            </Paper>
        </Grid>
    )
}

function TestTopstats({ data: { data1_s, data1_t } }) {
    const classes = useStyles();

    if (!data1_t) {
        return (
            <div>
            </div>
        );
    }
    else {
        let mr = data1_s[0].deaths / data1_s[0].confirmed;
        mr = Math.round(mr * 10000) / 100;

        let rr = data1_s[0].recovered / data1_s[0].confirmed;
        rr = Math.round(rr * 10000) / 100;
        let date = Moment(data1_t[data1_t.length - 1].updatetimestamp.slice(0,10), "DD/MM/YYYY", true)
        console.log(date.format("DD MMM"))
        return (
            <Box>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    {gridItem(data1_t[data1_t.length - 1].totalsamplestested, data1_t[data1_t.length - 1].samplereportedtoday, classes.tbtstd, "tested", "tested")}
                    {gridItem(mr, 0, classes.tbtstd, "Mortality Rate", "MR")}
                    {gridItem(rr, 0, classes.tbtstd, "Recovery Rate", "RR")}
                </Grid>
            </Box>
        );
    }
}
export default TestTopstats;