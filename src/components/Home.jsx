import React from 'react';
import axios from 'axios';
import Topstats from './Topstats';
import Datatable from './Datatable';
import Zonecheck from './Zonecheck';
import Map from './Map';
import Chart from './Chart';
import Footer from './Footer';
import Predictions from './Predictions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Home extends React.Component {

  constructor() {
    super()
    this.state = { data1: {}, data2: {}, data3: {} }
  }

  componentDidMount() {
    Promise.all([
      axios.get('https://api.covid19india.org/data.json'),
      axios.get('https://api.covid19india.org/state_district_wise.json'),
      axios.get('https://api.covid19india.org/zones.json')
    ])
      .then(([fetchedData1, fetchedData2, fetchedData3]) => {
        this.setState({ data1: fetchedData1.data, data2: fetchedData2.data, data3: fetchedData3.data });
      });
  }

  render() {

    const { data1, data2, data3 } = this.state;
    const modifiedData1 = {
      data1_cts: data1.cases_time_series,
      data1_s: data1.statewise,
      data1_t: data1.tested,
      data2_sdd: data2,
      data3_z: data3
    }
    return (
      <div>
        <Paper elevation={0}>
          <Container maxWidth="lg">
            <Grid container className="pt-64" direction="row" justify="space-evenly" alignItems="flex-start">
              <Grid item md={6} className="pt-64">
                <div className="fadeInUp" style={{ animationDelay: "1s" }}>
                  <Topstats data={modifiedData1} />
                  <Predictions data={modifiedData1} />
                </div>
                <div className="fadeInUp" style={{ animationDelay: "2s" }}>
                  <Zonecheck data={modifiedData1} />
                </div>
                <div className="fadeInUp" style={{ animationDelay: "2.75s" }}>
                  <Datatable data={modifiedData1} />
                </div>
              </Grid>
              <Grid item md={6} className="pt-64">
                <div className="fadeInUp" style={{ animationDelay: "3.5s" }}>
                  <Map data={modifiedData1} />
                </div>
                <div className="fadeInUp" style={{ animationDelay: "4.25s" }}>
                  <Chart data={modifiedData1} />
                </div>
              </Grid>
            </Grid>
            <div className="fadeInUp" style={{ animationDelay: "5s" }}>
            <Footer />
            </div>
          </Container>
        </Paper>
      </div>
    )
  }
}

export default Home;