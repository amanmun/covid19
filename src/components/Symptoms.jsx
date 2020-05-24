import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box, Divider, ListItemText, Typography, List, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary
    },
    list: {
        color: theme.palette.info.main,
        marginLeft: "2px",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
}));
export default function Symptoms() {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div>
            <Paper elevation={0}>
                <Container maxWidth="lg">
                    <div className="fadeInUp" style={{ animationDelay: "1.5s" }}>
                        <Grid container className="pt-64" spacing={6}>
                            <Grid item md={6}>
                                <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                                    <Typography variant="h6">
                                        SYMPTOMS
                                        </Typography>
                                </Box>
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            COVID-19 affects different people in different ways.
                                            Most infected people will develop mild to moderate illness and recover without hospitalization.
                                            </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Most common symptoms:
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            {bull}fever<br></br>
                                            {bull}dry cough<br></br>
                                            {bull}tiredness
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Less common symptoms:
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            {bull}aches and pains<br></br>
                                            {bull}sore throat<br></br>
                                            {bull}diarrhoea<br></br>
                                            {bull}conjunctivitis<br></br>
                                            {bull}headache<br></br>
                                            {bull}loss of taste or smell<br></br>
                                            {bull}a rash on skin, or discolouration of fingers or toes
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Serious symptoms:
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            {bull}difficulty breathing or shortness of breath<br></br>
                                            {bull}chest pain or pressure<br></br>
                                            {bull}loss of speech or movement
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Seek immediate medical attention if you have serious symptoms.
                                        <br></br><br></br>Always call before visiting your doctor or health facility.
                                        <br></br><br></br>People with mild symptoms who are otherwise healthy should manage their symptoms at home.
                                        <br></br><br></br>On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days.
                                        <br></br><br></br><Button variant="contained"
                                                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/q-a-coronaviruses#:~:text=symptoms">
                                                Learn More (WHO)
                                        </Button>
                                        </Typography>
                                    </ListItemText>
                                </List>
                            </Grid>
                            <Grid item md={6}>
                                <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                                    <Typography variant="h6">
                                        PREVENTIVE MEASURES
                                        </Typography>
                                </Box>
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Protect yourself and others around you by knowing the facts and taking appropriate precautions.
                                            Follow advice provided by your local public health agency.
                                            </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            To prevent the spread
                                            </Typography>
                                    </ListItemText>
                                    <ListItemText className={classes.list}>
                                        <Typography variant="subtitle2" style={{ fontSize: "18px" }}>
                                            {bull}Clean your hands often. Use soap and water, or an alcohol-based hand rub.<br></br>
                                            {bull}Maintain a safe distance from anyone who is coughing or sneezing.<br></br>
                                            {bull}Don’t touch your eyes, nose or mouth.<br></br>
                                            {bull}Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.<br></br>
                                            {bull}Stay home if you feel unwell.<br></br>
                                            {bull}If you have a fever, cough and difficulty breathing, seek medical attention. Call in advance.<br></br>
                                            {bull}Follow the directions of your local health authority.
                                        </Typography>
                                    </ListItemText>
                                </List>
                                <Divider />
                                <List>
                                    <ListItemText>
                                        <Typography variant="subtitle2">
                                            Avoiding unneeded visits to medical facilities allows healthcare systems to operate more effectively,
                                         therefore protecting you and others.<br></br><br></br>
                                            <Button variant="contained"
                                                href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/q-a-coronaviruses#:~:text=symptoms">
                                                Learn More (WHO)
                                        </Button>
                                        </Typography>
                                    </ListItemText>
                                </List>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Paper>
        </div>
    )
}