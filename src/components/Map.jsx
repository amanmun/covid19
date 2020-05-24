import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { makeStyles } from '@material-ui/core/styles';
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
    let lr = 'rgba(255,0,0,0.15)';
    let hr = 'rgba(255,0,0,0.8)';

    const classes = useMapStyles();

    if (!data1_s) {
        return <div></div>
    }
    else {
        let output1 = [];

        for (let i = 0; i < data1_s.length; i++)
            output1.push(parseInt(data1_s[i].confirmed));

        let maxValue = output1[1];
        let minValue = output1[1];
        for (let i = 1; i < output1.length; i++) {
            if (output1[i] > maxValue) {
                maxValue = output1[i];
            }
            if (output1[i] < minValue) {
                minValue = output1[i];
            }
        }
        const INDIA_TOPO_JSON = require('./map/india.json');

        const PROJECTION_CONFIG = {
            scale: 350,
            center: [78.9629, 22.5937]
        };

        const DEFAULT_COLOR = '#EEE';

        const geographyStyle = {
            default: {
                outline: 'none'
            },
            hover: {
                fill: 'white',
                transition: 'all 250ms',
                stroke: '#424242',
            },
            pressed: {
                outline: 'none'
            }
        };

        const colorScale = scaleLinear()
            .domain([0, maxValue])
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

        function maphov(classname, name1, name2, statevar, data) {
            return (
                <Grid item>
                    <Paper elevation={0} align="center" className={classname}>
                        <Typography variant="button">
                            {window.innerWidth > "768" ? name1 : name2}
                        </Typography>
                        <Typography variant="h6">
                            {statevar === '' ? formatNumber(data) : formatNumber(statevar)}
                        </Typography>
                    </Paper>
                </Grid>
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
                            {maphov(classes.tbcnfd, "confirmed", "cnfd", cnfd, data1_s[0].confirmed)}
                            {maphov(classes.tbactv, "active", "actv", actv, data1_s[0].active)}
                            {maphov(classes.tbrcvd, "recovered", "rcvd", rcvd, data1_s[0].recovered)}
                            {maphov(classes.tbdcsd, "deceased", "dcsd", dcsd, data1_s[0].deaths)}
                        </Grid>
                    </Box>
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

                                    const current = data1_s.find(s => s.state === geo.properties.st_nm);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={current ? colorScale(current.confirmed) : DEFAULT_COLOR}
                                            style={geographyStyle}
                                            onMouseEnter={onMouseEnter(geo, current)}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </Box>
            </div>
        );
    }
}
export default Map;
