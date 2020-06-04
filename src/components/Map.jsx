import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { scaleLinear } from 'd3-scale';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { formatNumber } from './commonFunc/formatNumber';

const useMapStyles = makeStyles((theme) => ({
    tbcnfd: {
        color: theme.palette.error.main,
    },
    tbactv: {
        color: theme.palette.primary.main
    },
    tbrcvd: {
        color: theme.palette.success.main
    },
    tbdcsd: {
        color: theme.palette.text.secondary
    }
}));

const Map = ({ data: { data1_s } }) => {
    let [cnfd, setCnfd] = useState('');
    let [actv, setActv] = useState('');
    let [rcvd, setRcvd] = useState('');
    let [dcsd, setDcsd] = useState('');
    let [sname, setSname] = useState('');
    let [value, setValue] = useState(1);
    let [lr, setLr] = useState('rgba(255,0,0,0.15)');
    let [hr, setHr] = useState('rgba(255,0,0,0.8)');
    let [maximum, setMaximum] = useState(0);
    let [minimum, setMinimum] = useState(0);

    let minC, maxC;

    const theme = useTheme();

    const classes = useMapStyles();

    if (!data1_s) {
        return <div></div>
    }
    else {

        function getMax(arr, prop) { //functions to getmax object based on key
            let max;
            for (var i = 0; i < arr.length; i++) {
                if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                    max = arr[i];
            }
            return max;
        }

        function getMin(arr, prop) { //functions to getmin object based on key
            let min;
            for (var i = 0; i < arr.length; i++) {
                if (min == null || parseInt(arr[i][prop]) < parseInt(min[prop]))
                    min = arr[i];
            }
            return min;
        }

        let data1 = [...data1_s];
        data1.splice(0, 1) //removing total

        let maxD = getMax(data1, "deaths").deaths;
        let maxA = getMax(data1, "active").active;
        let maxR = getMax(data1, "recovered").recovered;
        maxC = getMax(data1, "confirmed").confirmed;

        let minD = getMin(data1, "deaths").deaths;
        let minA = getMin(data1, "active").active;
        let minR = getMin(data1, "recovered").recovered;
        minC = getMin(data1, "confirmed").confirmed;

        const INDIA_TOPO_JSON = require('./map/india.json');

        const PROJECTION_CONFIG = {
            scale: 350,
            center: [78.9629, 22.5937]
        };

        const DEFAULT_COLOR = '#EEE';

        const geographyStyle = {
            default: {
                outline: 'none',
                transition: 'all ease 0.25s'
            },
            hover: {
                fill: 'white',
                transition: 'all 100ms',
                stroke: hr,
            },
            pressed: {
                outline: 'none'
            }
        };

        const colorScale = scaleLinear()
            .domain([minimum, maximum])
            .range([lr, hr]);

        const onMouseEnter = (geo, current) => {
            return () => {
                setCnfd(`${current.confirmed}`)
                setActv(`${current.active}`)
                setRcvd(`${current.recovered}`)
                setDcsd(`${current.deaths}`)
                setSname(`${current.state}`)
            };
        };

        function maphov(classname, name1, name2, statevar, data, color, x, lr1, hr1, max, min) {
            return (
                <Grid item sm={3}>
                    <Paper onClick={() => { setValue(x); setLr(lr1); setHr(hr1); setMaximum(max); setMinimum(min) }}
                        style={{ backgroundColor: color, cursor: "pointer" }} elevation={0} align="center" className={classname}>
                        <Typography variant="button">
                            {window.innerWidth >= "768" ? name1 : name2}
                        </Typography>
                        <Typography variant="h6">
                            {statevar === '' ? formatNumber(data) : formatNumber(statevar)}
                        </Typography>
                    </Paper>
                </Grid>
            )
        }
        function returnMap(datakey) {
            if (maximum === 0) {
                setMaximum(maxC)
                setMinimum(minC)
            }

            return (

                <ComposableMap
                    projectionConfig={PROJECTION_CONFIG}
                    projection="geoMercator"
                    data-tip=""
                    viewBox="320 180 220 220"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <Geographies geography={INDIA_TOPO_JSON}>
                        {({ geographies }) =>
                            geographies.map(geo => {

                                const current = data1.find(s => s.state === geo.properties.st_nm);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={current ?
                                            datakey === 1 ? colorScale(current.confirmed) :
                                                datakey === 2 ? colorScale(current.active) :
                                                    datakey === 3 ? colorScale(current.recovered) : colorScale(current.deaths)
                                            : DEFAULT_COLOR}
                                        style={geographyStyle}
                                        onMouseEnter={onMouseEnter(geo, current)}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
            )
        }
        return (
            <div>
                <Box m="auto" textAlign="center" bgcolor="background.paper">
                    <Typography variant="h6">
                        India Map
                    </Typography>
                </Box>
                <Box mt={3}>
                    <Box mt={2} mb={2} color="text.secondary">
                        <Typography variant="h6" align="center">
                            {sname === '' ? 'Total (Hover over the map)' : sname}
                        </Typography>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                            {maphov(classes.tbcnfd, "confirmed", "cnfd", cnfd, data1_s[0].confirmed, "rgba(255,0,0,0.1)", 1, "rgba(255,0,0,0.15)", "rgba(255,0,0,0.8)", maxC, minC)}
                            {maphov(classes.tbactv, "  active  ", "actv", actv, data1_s[0].active, "rgba(0,0,255,0.1)", 2, "rgba(0,0,255,0.15)", "rgba(0,0,255,0.8)", maxA, minA)}
                            {maphov(classes.tbrcvd, "recovered", "rcvrd", rcvd, data1_s[0].recovered, "rgba(0,255,0,0.1)", 3, "rgba(0,255,0,0.15)", "rgba(0,255,0,0.8)", maxR, minR)}
                            {maphov(classes.tbdcsd, "deceased", "dcsd", dcsd, data1_s[0].deaths, theme.palette.action.selected, 4, "#E8E8E8", "#424242", maxD, minD)}
                        </Grid>
                    </Box>
                    <div>{returnMap(value)}</div>
                    <Typography variant="caption">Click on the tabs to see diff. choropleths</Typography>
                </Box>
            </div>
        );
    }
}
export default Map;
