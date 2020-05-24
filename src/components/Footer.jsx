import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as Icon from 'react-feather';
import { Button, ButtonGroup, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary
    }
}));

export default function Footer() {
    const classes=useStyles()

    return (
        <Box>
            <Container maxWidth="sm" className={classes.root}>
                <Grid container direction="column" justify="space-evenly" alignItems="center">
                    <br></br>
                    <Typography variant="subtitle2">
                        Stay Home, Stay Safe !
                </Typography>
                    <br></br>
                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        variant="text"
                    >
                        <Button href="https://api.covid19india.org/"><Icon.Database /> DATA API</Button>
                        <Button href="https://twitter.com/covid19indiaorg"><Icon.Twitter /> TWITTER</Button>
                    </ButtonGroup>
                    <br></br>
                    <Typography variant="subtitle2" style={{textAlign: "center"}}>
                        This website is heavily inspired by <a href="https://www.covid19india.org">www.covid19india.org</a> who are doing a great job in tracking the COVID-19 pandemic in India.<br></br>Kudos to them !
                </Typography>
                </Grid>
            </Container>
        </Box>
    )
}
