import React from 'react';
import axios from 'axios';
import TestTopstats from './TestTopstats';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TestDatatable from './TestDatatable';
import TestChart from './TestChart';
import Calculations from './Calculations';

class Testing extends React.Component {

    constructor() {
        super()
        this.state = { data1: {}, data2: {} }
    }

    componentDidMount() {
        Promise.all([
            axios.get('https://api.covid19india.org/data.json'),
            axios.get('https://api.covid19india.org/state_test_data.json'),
        ])
            .then(([fetchedData1, fetchedData2]) => {
                this.setState({ data1: fetchedData1.data, data2: fetchedData2.data });
            });
    }

    render() {

        const { data1, data2 } = this.state;
        const modifiedData1 = {
            data1_s: data1.statewise,
            data1_t: data1.tested,
            data2_t: data2.states_tested_data,
        }
        return (
            <div>
                <Paper elevation={0}>
                    <Container maxWidth="lg">
                        <div className="fadeInUp pt-100" style={{ animationDelay: "1.5s" }}>
                            <TestTopstats data={modifiedData1} />
                        </div>
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                            <Grid item md={6}>
                                <div className="fadeInUp" style={{ animationDelay: "2.5s" }}>
                                    <TestDatatable data={modifiedData1} />
                                </div>
                            </Grid>
                            <Grid item md={6} className="pt-64">
                                <div className="fadeInUp" style={{ animationDelay: "2.5s" }}>
                                    <TestChart data={modifiedData1} />
                                    <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                                        <Calculations />
                                    </Box>
                                </div>
                            </Grid>

                        </Grid>
                    </Container>
                </Paper>
            </div>
        )
    }
}

export default Testing;