import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { formatNumber } from './commonFunc/formatNumber';
import Grid from '@material-ui/core/grid'
import Button from '@material-ui/core/Button';
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

const DailyChart = ({ data: { data1_s, data1_cts } }) => {

  const [lcwidth, setLcwidth] = useState(window.innerWidth > 768 ? (window.innerWidth > 1025 ? 520 : 480) : 380);
  const theme = useTheme();

  let [cnfd, setCnfd] = useState('');
  let [actv, setActv] = useState('');
  let [rcvd, setRcvd] = useState('');
  let [dcsd, setDcsd] = useState('');
  let [date, setDate] = useState('');
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
            <XAxis dataKey="date"
              stroke={color}
              interval="preserveStartEnd"
              domain={['auto', 'auto']}
              strokeWidth={3}
              tick={{ fontSize: 10, fontWeight: "bolder" }} />
            <YAxis
              type="number"
              tickFormatter={DataFormater}
              domain={[0, (Math.ceil(datamax / 100000)) * 100000]}
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
export default DailyChart;