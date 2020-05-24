import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Calculations() {
    return (
        <div>
            <Typography variant="h6">
                Formulae Used
        </Typography>
            <Box>
                <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                    <br></br>
                    <Typography variant="button">Mortality Rate (MR) = </Typography>
                    <Typography variant="subtitle2"><i>(Total Deceased) / (Total Confirmed Cases)</i></Typography>
                    <br></br>
                    <Typography variant="button">Recovery Rate (RR) = </Typography>
                    <Typography variant="subtitle2"><i>(Total Recovered) / (Total Confirmed Cases)</i></Typography>
                </Grid>
            </Box>
        </div>
    )
}
