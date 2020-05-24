import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatNumber } from './commonFunc/formatNumber';
import { Typography } from '@material-ui/core';

const useRowStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    table: {
        minWidth: 200,
        maxWidth: 600,
        cursor: "pointer",

    },
    thclass: {
        backgroundColor: theme.palette.action.disabled,
        fontSize: 11
    },
    tcclass: {
        paddingRight: 2,
        paddingLeft: 2,
        color: theme.palette.action.active,
        fontSize: 12,
        fontWeight: 700
    },
}));

function Row(props) {
    const { row } = props;
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow hover={true} className={classes.root}>
                <TableCell className={classes.tcclass} component="th" scope="row">
                    {row.state}
                </TableCell>
                <TableCell align="center" className={classes.tcclass}>{formatNumber(row.tested)}
                </TableCell>
                <TableCell align="center" className={classes.tcclass}>{formatNumber(row.mortality)} %
                </TableCell>
                <TableCell align="center" className={classes.tcclass}>{formatNumber(row.recovery)} %
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function TestDatatable({ data: { data1_s, data1_t, data2_t } }) {

    const classes = useRowStyles();

    if (!data1_s) {
        return <div></div>;
    }
    else {
        let dataT = [...data1_s]
        let dataTT = [...data2_t]

        let data = []
        dataT.splice(0, 1)

        dataT.forEach(function (element, i) {
            if (element.state === "State Unassigned") {
                dataT.splice(i, 1)
            }
        })

        dataT.forEach(function (element) {
            if (element.confirmed !== "0") {
                element.mortality = `${(element.deaths) / (element.confirmed)}`;
                element.recovery = `${(element.recovered) / (element.confirmed)}`;
                element.tested = 0;
                element.mortality = Math.round(element.mortality * 10000) / 100;
                element.recovery = Math.round(element.recovery * 10000) / 100;
            }
            else {
                element.mortality = 0
                element.recovery = 0
                element.tested = 0;
            }
        });
        let unique = []

        dataT.forEach(function (element) {
            unique[element.state] = 0
        });

        dataTT.forEach(function (element) {
            unique[element.state] = element.totaltested
        });

        dataT.forEach(function (element) {
            element.tested = unique[element.state] !== "" ? unique[element.state] : 0
        });

        data = []
        dataT.forEach(function (element) {
            if (element.tested !== 0)
                data.push(element)
        });

        return (
            <div>
                <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
                    <Typography variant="h6">
                        State and District Statistics
                    </Typography>
                </Box>
                <Box flexGrow={1}>
                    <Table stickyHeader className={classes.table} size="small">
                        <caption>States having zero active cases or no test data have been removed</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ paddingLeft: 15 }} className={classes.thclass}>State</TableCell>
                                <TableCell align="center" className={classes.thclass}>{window.innerWidth > "768" ? "Tested" : "Tstd"}</TableCell>
                                <TableCell align="center" className={classes.thclass}>{window.innerWidth > "768" ? "Mortality" : "Mrtlty"}</TableCell>
                                <TableCell align="center" className={classes.thclass}>{window.innerWidth > "768" ? "Recovery" : "Rcvry"}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, i) => (
                                <Row key={i} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </div>
        );
    }
}