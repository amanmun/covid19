import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box, Divider, ListItemText, Typography, List, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary
    },
    list: {
        color: theme.palette.info.main,
        marginLeft: "2px",
    }
}));
export default function About() {

    const classes = useStyles();

    return (
        <div>
            <Paper elevation={0} style={{minHeight: "98vh"}}>
                <Container maxWidth="sm">
                    <div className="fadeInUp" style={{ animationDelay: "1.5s" }}>
                        <Grid container className="pt-64" spacing={6}>
                            <Grid item sm={12}>
                                <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                                    <Typography variant="h6">
                                        ABOUT
                                        </Typography>
                                </Box>
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Are you official?
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            No.
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            What are your sources? How is the data gathered for this project?
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            This website is using state bulletins and official handles to update its numbers.
                                            The data is validated by a group of volunteers and published into a Google sheet and an API.
                                        API is available for all at <a href="https://api.covid19india.org">api.covid19india.org</a>.
                                        The source list is <a href="https://telegra.ph/Covid-19-Sources-03-19">here.</a>
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            What's the inspiration behind this website?
                                        </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            This website is inspired by <a href="https://www.covid19india.org">www.covid19india.org</a> who are doing a great job in tracking the COVID-19 pandemic in India.
                                        <br></br>Kudos to them !
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Paper>
        </div>
    )
}
