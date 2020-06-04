import React from 'react';
import axios from 'axios';
import EssComponents from './EssComponents';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core';

class Essentials extends React.Component {

    constructor() {
        super()
        this.state = { data1: {} }
    }

    componentDidMount() {
        Promise.all([
            axios.get('https://api.covid19india.org/resources/resources.json')
        ])
            .then(([fetchedData1]) => {
                this.setState({ data1: fetchedData1.data });
            });
    }

    render() {
        const { data1 } = this.state;
        const data = {
            data1_r: data1.resources
        }
        return (
            <div>
                <Paper elevation={0} style={{ minHeight: "100vh" }}>
                    <Container maxWidth="sm">
                        <Grid container className="pt-64" direction="row" justify="space-evenly" alignItems="flex-start">
                            <Grid item md={6} className="pt-64"></Grid>
                            <div className="fadeInUp" style={{animationDelay:"1s"}}>
                            <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                                <Typography variant="h6">
                                    CHECK FOR NEARBY ESSENTIALS
                                </Typography>
                            </Box>
                            <EssComponents data={data} />
                            <Box textAlign="center">
                                <Alert severity="warning" style={{ fontSize: 9 }}>
                                    This is a community sourced listing platform and is not associated with any of the organizations listed above.
                                    Although all the listings are verified, we request you to follow all the guidelines and take the necessary precautions.
                                We encourage you to report any error or suspicious activity <a color="inherit" href="https://www.covid19india.org/essentials">here</a>.

                                </Alert>
                            </Box>
                            </div>
                        </Grid>
                    </Container>
                </Paper>
            </div>
        )
    }
}
export default Essentials;