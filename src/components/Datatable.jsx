import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { formatNumber } from './commonFunc/formatNumber';

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
  thclass1: {
    fontSize: "0.8rem",
    fontWeight: '700',
    backgroundColor: theme.palette.background.paper,
  },
  thclass2: {
    fontSize: "0.8rem",
    fontWeight: '700',
    color: theme.palette.error.main,
    backgroundColor: "rgba(255,0,0,0.1)",
  },
  thclass3: {
    fontSize: "0.8rem",
    fontWeight: '700',
    color: theme.palette.info.main,
    backgroundColor: "rgba(0,0,255,0.1)",
  },
  thclass4: {
    fontSize: "0.8rem",
    fontWeight: '700',
    color: theme.palette.success.main,
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  thclass5: {
    fontSize: "0.8rem",
    fontWeight: '700',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.action.selected,
  },
  tcclass: {
    paddingRight: 2,
    paddingLeft: 2,
    color: theme.palette.action.active,
    fontSize: "0.8rem",
    fontWeight: 700
  },
  tbcnfd: {
    color: theme.palette.error.main,
    fontSize: 10,
    fontWeight: 700,
  },
  tbactv: {
    color: theme.palette.primary.main,
    fontSize: 10,
    fontWeight: 700,
  },
  tbrcvd: {
    color: theme.palette.success.main,
    fontSize: 10,
    fontWeight: 700,
  },
  tbdcsd: {
    color: theme.palette.text.secondary,
    fontSize: 10,
    fontWeight: 700,
  }
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow hover={true} className={classes.root} onClick={() => setOpen(!open)}>
        <TableCell className={classes.tcclass}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.tcclass} component="th" scope="row">
          {row.state}
        </TableCell>
        <TableCell align="center" className={classes.tcclass}>{formatNumber(row.confirmed)}
          <Typography className={classes.tbcnfd} variant="subtitle2">
            {row.deltaconfirmed > 0 ? `[+${formatNumber(row.deltaconfirmed)}]` : ""}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.tcclass}>{formatNumber(row.active)}</TableCell>
        <TableCell align="center" className={classes.tcclass}>{formatNumber(row.recovered)}
          <Typography className={classes.tbrcvd} variant="subtitle2">
            {row.deltarecovered > 0 ? `[+${formatNumber(row.deltarecovered)}]` : ""}
          </Typography>
        </TableCell>
        <TableCell align="center" className={classes.tcclass}>{formatNumber(row.deaths)}
          <Typography className={classes.tbdcsd} variant="subtitle2">
            {row.deltadeaths > 0 ? `[+${formatNumber(row.deltadeaths)}]` : ""}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Disctrict Data
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tcclass}>{window.innerWidth > "768" ? "District" : "Dist"}</TableCell>
                    <TableCell align="center" className={classes.tcclass}>{window.innerWidth > "768" ? "Confirmed" : "Cnfd"}</TableCell>
                    <TableCell align="center" className={classes.tcclass}>{window.innerWidth > "768" ? "Active" : "Actv"}</TableCell>
                    <TableCell align="center" className={classes.tcclass}>{window.innerWidth > "768" ? "Recovered" : "Rcvrd"}</TableCell>
                    <TableCell align="center" className={classes.tcclass}>{window.innerWidth > "768" ? "Deceased" : "Dcsd"}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(row.districtdata).map((row1, i) => (
                    <TableRow key={row1[0]}>
                      <TableCell className={classes.tcclass}>{row1[0]}</TableCell>
                      <TableCell align="center" className={classes.tcclass}>{formatNumber(row1[1].confirmed)}
                        <Typography className={classes.tbcnfd} variant="subtitle2">
                          {row1[1].delta.confirmed > 0 ? `[+${formatNumber(row1[1].delta.confirmed)}]` : ""}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" className={classes.tcclass}>{formatNumber(row1[1].active)}</TableCell>
                      <TableCell align="center" className={classes.tcclass}>{formatNumber(row1[1].recovered)}
                        <Typography className={classes.tbrcvd} variant="subtitle2">
                          {row1[1].delta.recovered > 0 ? `[+${formatNumber(row1[1].delta.recovered)}]` : ""}
                        </Typography>
                      </TableCell>
                      <TableCell align="center" className={classes.tcclass}>{formatNumber(row1[1].deceased)}
                        <Typography className={classes.tbdcsd} variant="subtitle2">
                          {row1[1].delta.deceased > 0 ? `[+${formatNumber(row1[1].delta.deceased)}]` : ""}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Datatable({ data: { data1_s, data2_sdd } }) {

  const classes = useRowStyles();

  if (!data1_s) {
    return <div></div>;
  }
  else {
    if (!data2_sdd) {
      return <div></div>
    }
    else {

      let data1 = [...data1_s];
      data1.splice(0, 1)
      let data2 = Object.entries(data2_sdd);

      data1.forEach(function (element) {
        data2.forEach(function (element1) {
          if (element1[1].statecode === element.statecode) {
            element1.forEach(function (element2) {
              if (typeof element2.districtData != "undefined") {
                element["districtdata"] = element2.districtData
              }
            })
          }
        })
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
              <caption>Compiled from State Govt. numbers</caption>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.thclass1}></TableCell>
                  <TableCell className={classes.thclass1}>State</TableCell>
                  <TableCell align="center" className={classes.thclass2}>{window.innerWidth > "768" ? "Confirmed" : "Cnfd"}</TableCell>
                  <TableCell align="center" className={classes.thclass3}>{window.innerWidth > "768" ? "Active" : "Actv"}</TableCell>
                  <TableCell align="center" className={classes.thclass4}>{window.innerWidth > "768" ? "Recovered" : "Rcvrd"}</TableCell>
                  <TableCell align="center" className={classes.thclass5}>{window.innerWidth > "768" ? "Deceased" : "Dcsd"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data1.map((row, i) => (
                  <Row key={i} row={row} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </div>
      );
    }
  }
}

