import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { formatNumber } from './commonFunc/formatNumber';
import Grid from '@material-ui/core/grid'
import Button from '@material-ui/core/Button';
import Moment from 'moment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

const TestChart = ({ data: { data1_t } }) => {

  const [lcwidth, setLcwidth] = useState(window.innerWidth > 768 ? (window.innerWidth > 1025 ? 520 : 480) : 380);

  let [tstd, setTstd] = useState('');
  let [date, setDate] = useState('');
  const [value, setValue] = useState(0);

  if (!data1_t) {
    return <div></div>
  }
  else {

    let dataT = [...data1_t];
    const datamax = parseInt(data1_t[data1_t.length - 1].totalsamplestested);

    let data14 = [...dataT].slice(-14)
    let data7 = [...dataT].slice(-7)

    const DataFormater = (number) => {
      if (number > 1000000000) {
        return (number / 1000000000).toString() + 'B';
      } else if (number > 1000000) {
        return (number / 1000000).toString() + 'M';
      } else if (number > 1000) {
        return (number / 1000).toString() + 'K';
      } else {
        return number.toString();
      }
    }

    dataT.forEach(function (element) {
      element.dateformatted = Moment(element.updatetimestamp.slice(0, 10), "DD/MM/YYYY", true).format("DD MMM")
      if (element.totalsamplestested === "")
        element.totalsamplestested = "0"
    });

    function displayWindowSize() {
      let w = document.documentElement.clientWidth;
      if (w > 1025)
        setLcwidth(520)
      if (w > 768)
        setLcwidth(480)
      if (w <= 768) {
        let temp = 380
        setLcwidth(temp)
      }
    }

    window.addEventListener("resize", displayWindowSize);

    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        tstd = payload[0].value;
        setDate(payload[0].payload.dateformatted)
        setTstd(tstd);
      }
      return null;
    };
    function chart(bgcolor, color, text, data, datakey, customtool, statevar, datamax) {
      return (
        < Box p={2} mt={2} mb={2} style={{ backgroundColor: bgcolor }
        }>
          <Typography variant="button" style={{ color: color, marginBottom: '-60px' }}>
            Total {text}<br></br>
            {date}<br></br>
            {statevar !== '' ? formatNumber(statevar) : ''}
          </Typography>
          <LineChart data={data}
            width={lcwidth}
            height={160}
            syncId="anyId">
            <XAxis dataKey="dateformatted"
              stroke={color}
              interval="preserveStartEnd"
              domain={['auto', 'auto']}
              strokeWidth={3}
              tick={{ fontSize: 10, fontWeight: "bolder" }} />
            <YAxis
              type="number"
              tickFormatter={DataFormater}
              domain={[0, (Math.ceil(datamax / 1000000)) * 1000000]}
              strokeWidth={3}
              stroke={color}
              tick={{ fontSize: 10, fontWeight: "bolder" }}
              orientation='right'
            />
            <CartesianGrid
              vertical={false}
              horizontal={false} />
            <Tooltip content={customtool} />
            <Line
              type="monotone"
              dot={{ r: 2, fill: color }}
              dataKey={datakey}
              stroke={color}
              activeDot={{ r: 4 }} />
          </LineChart>
        </Box >
      )
    }


    return (
      <div>
        <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
          <Typography variant="h6">
            India Chart
          </Typography>
        </Box>
        <Box>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Button variant="outlined" onClick={() => { setValue(2) }}>Last 7 days</Button>
            <Button variant="outlined" onClick={() => { setValue(1) }}>Last 14 days</Button>
            <Button variant="outlined" onClick={() => { setValue(0) }}>Beginning</Button>
          </Grid>
          <TabPanel value={value} index={0}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              {chart("rgba(255,152,0,0.1)", "#ff9800", "Tested", dataT, "totalsamplestested", CustomTooltip, tstd, datamax)}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              {chart("rgba(255,152,0,0.1)", "#ff9800", "Tested", data14, "totalsamplestested", CustomTooltip, tstd, datamax)}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              {chart("rgba(255,152,0,0.1)", "#ff9800", "Tested", data7, "totalsamplestested", CustomTooltip, tstd, datamax)}
            </Grid>
          </TabPanel>
        </Box>
      </div>
    );

  }
}
export default TestChart;