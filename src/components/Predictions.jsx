import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Icon from 'react-feather';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { formatNumber } from './commonFunc/formatNumber';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        color: theme.palette.warning.main,
        backgroundColor: "rgba(255,152,0,0.1)"
    },
    pos: {
        marginBottom: 12,
    },
}));

function Predictions({ data: { data1_cts, data1_s } }) {
    const classes = useStyles();

    if (!data1_s) {
        return (
            <div>
            </div>
        );
    }
    else {
        const n = data1_cts.length - 1;
        let sum = 0
        for (let i = 0; i < 3; i++) {
            sum = sum + parseInt(data1_cts[n - i].dailyconfirmed) / parseInt(data1_cts[n - i - 1].totalconfirmed);
        }

        sum = sum / 3;

        let doubRate = 72 / (sum * 100)
        const pred = [data1_cts[n].totalconfirmed] * sum
        return (
            <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                <Icon.Clipboard />  Predictions for today
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {formatNumber(Math.round(pred))} confirmed cases<br></br>
                            </Typography>
                            <Typography className={classes.pos}>
                                Growth Rate = {Math.round(sum*10000)/100}%<br></br>
                                Doubling Rate = {Math.round(doubRate*100)/100} days
                            </Typography>                            
                        </CardContent>                        
                    </Card>
                </Grid>
            </Box>
        );
    }
}
export default Predictions;