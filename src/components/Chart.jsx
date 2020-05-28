import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { formatNumber } from './commonFunc/formatNumber';
import Grid from '@material-ui/core/grid'
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
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

const Chart = ({ data: { data1_s, data1_cts } }) => {

  const theme = useTheme();
  let w = document.documentElement.clientWidth;
  const [lcWidth, setLcwidth] = useState(w >= 768 ? 480 : w < 400 ? 330 : 380)

  let [cnfd, setCnfd] = useState(' ');
  let [actv, setActv] = useState(' ');
  let [rcvd, setRcvd] = useState(' ');
  let [dcsd, setDcsd] = useState(' ');
  let [date, setDate] = useState(' ');
  const [value, setValue] = useState(0);

  if (!data1_cts) {
    return <div></div>
  }
  else {

    let dataT = [...data1_cts];
    const datamax = parseInt(data1_cts[data1_cts.length - 1].totalconfirmed);

    dataT.forEach(function (element) {
      element.totalactive = `${element.totalconfirmed - element.totalrecovered - element.totaldeceased}`;
      element.date = `${element.date.slice(0, 6)}`
    });

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

    function displayWindowSize() {
      let w = document.documentElement.clientWidth;
      if (w >= 768)
        setLcwidth(480)
      else {
        if (w < 400)
          setLcwidth(330)
        else
          setLcwidth(380)
      }
    }

    window.addEventListener("resize", displayWindowSize);

    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        cnfd = payload[0].value;
        setDate(payload[0].payload.date)
        setCnfd(cnfd);
      }
      return null;
    };
    const CustomTooltip1 = ({ active, payload, label }) => {
      if (active) {
        actv = payload[0].value;
        setActv(actv)
      }
      return null;
    };
    const CustomTooltip2 = ({ active, payload, label }) => {
      if (active) {
        rcvd = payload[0].value;
        setRcvd(rcvd)
      }
      return null;
    };
    const CustomTooltip3 = ({ active, payload, label }) => {
      if (active) {
        dcsd = payload[0].value;
        setDcsd(dcsd)
      }
      return null;
    };

    function chart(bgcolor, color, text, data, datakey, customtool, statevar, datamax) {
      return (
        <Box mt={2} mb={2}>
          <LineChart
            data={data}
            width={lcWidth}
            height={160}
            syncId="anyId"
            style={{ backgroundColor: bgcolor }}
            margin={{
              top: 10, left: 5
            }}>
            <XAxis dataKey="date"
              stroke={color}
              interval="preserveStartEnd"
              domain={['auto', 'auto']}
              strokeWidth={2}
              tick={{ fontSize: 10 }}
            >
              <Label value={text} angle={0} dy={-120} position="insideTopLeft" fill={color} fontWeight={800} />
              <Label value={statevar} formatter={formatNumber} angle={0}
                dy={-105} position="insideTopLeft" fill={color} fontWeight={800} />
              <Label value={date} angle={0} dy={-90} position="insideTopLeft" fill={color} fontWeight={800} />
            </XAxis>
            <YAxis
              type="number"
              tickFormatter={DataFormater}
              domain={[0, (Math.ceil(datamax / 100000)) * 100000]}
              strokeWidth={2}
              stroke={color}
              tick={{ fontSize: 10 }}
              orientation='right'
            />
            <CartesianGrid
              vertical={false}
              horizontal={false} />
            <Tooltip content={customtool} />
            <Line
              type="monotone"
              animationDuration={250}
              dot={{ r: 1, fill: color }}
              dataKey={datakey}
              stroke={color}
              strokeWidth={2}
              activeDot={{ r: 3 }} />
          </LineChart>
        </Box>
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
          <ButtonGroup disableElevation variant="text" color="inherit">
            <Button onClick={() => { setValue(2) }}>Last 7 days</Button>
            <Button onClick={() => { setValue(1) }}>Last 14 days</Button>
            <Button onClick={() => { setValue(0) }}>Beginning</Button>
          </ButtonGroup>
          </Grid>
          <TabPanel value={value} index={0}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              {chart("rgba(255,0,0,0.1)", "#f44336", "Confirmed", dataT, "totalconfirmed", CustomTooltip, cnfd, datamax)}
              {chart("rgba(0,0,255,0.1)", "#2196f3", "Active", dataT, "totalactive", CustomTooltip1, actv, datamax)}
              {chart("rgba(0,255,0,0.1)", "#4caf50", "Recovered", dataT, "totalrecovered", CustomTooltip2, rcvd, datamax)}
              {chart(theme.palette.action.selected, theme.palette.text.secondary, "Deceased", dataT, "totaldeceased", CustomTooltip3, dcsd, datamax)}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              {chart("rgba(255,0,0,0.1)", "#f44336", "Confirmed", data14, "totalconfirmed", CustomTooltip, cnfd, datamax)}
              {chart("rgba(0,0,255,0.1)", "#2196f3", "Active", data14, "totalactive", CustomTooltip1, actv, datamax)}
              {chart("rgba(0,255,0,0.1)", "#4caf50", "Recovered", data14, "totalrecovered", CustomTooltip2, rcvd, datamax)}
              {chart(theme.palette.action.selected, theme.palette.text.secondary, "Deceased", data14, "totaldeceased", CustomTooltip3, dcsd, datamax)}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              {chart("rgba(255,0,0,0.1)", "#f44336", "Confirmed", data7, "totalconfirmed", CustomTooltip, cnfd, datamax)}
              {chart("rgba(0,0,255,0.1)", "#2196f3", "Active", data7, "totalactive", CustomTooltip1, actv, datamax)}
              {chart("rgba(0,255,0,0.1)", "#4caf50", "Recovered", data7, "totalrecovered", CustomTooltip2, rcvd, datamax)}
              {chart(theme.palette.action.selected, theme.palette.text.secondary, "Deceased", data7, "totaldeceased", CustomTooltip3, dcsd, datamax)}
            </Grid>
          </TabPanel>
        </Box>
      </div>
    );

  }
}
export default Chart;