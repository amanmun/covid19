import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export default function Zonecheck({ data: { data1_s, data2_sdd, data3_z } }) {

  const classes = useStyles();
  const [staten, setStaten] = useState('-1')
  const [district, setDistrict] = useState('-1')

  const handleChange = (event) => {
    setStaten(event.target.value)
  };
  const handleChange1 = (event) => {
    setDistrict(event.target.value)
  };

  if (!data1_s)
    return <div></div>
  else {
    let data1 = [...data1_s];
    data1.splice(0, 1)

    function Temp() {
      let data = []
      for (let i = 0; i < data3_z.zones.length; i++) {
        if (staten === data3_z.zones[i].state) {
          data.push({
            district1: data3_z.zones[i].district,
            zone: data3_z.zones[i].zone,
          })
        }
      }
      return (
        <div><FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
          <InputLabel htmlFor="id2">District</InputLabel>
          <Select
            native
            value={district}
            onChange={handleChange1}
            label="District"
            inputProps={{
              name: 'district',
              id: 'id2',
            }}
          >
            {data.map((row, i) => (
              <option key={i} value={row.district1}>{row.district1}</option>
            ))}
          </Select>
        </FormControl>
          <Box p={2} m="auto">
            <div>{district !== -1 ? <div>{data.map((row) => (
              <div>{row.district1 === district ?
                <div className="classes.alert">
                  {
                    (() => {
                      if (row.zone === "Red")
                        return <Alert severity="error">This is a Red Zone</Alert>
                      if (row.zone === "Orange")
                        return <Alert severity="warning">This is an Orange Zone</Alert>
                      else
                        return <Alert severity="success">This is a Green Zone</Alert>
                    })()
                  }
                </div> : ''}
              </div>))}
            </div> : ''}
            </div>
          </Box>
        </div>
      )
    }
    return (
      <div>
        <Box p={6} m="auto" textAlign="center" bgcolor="background.paper">
          <Typography variant="h6">
            Check Your Zone
                    </Typography>
        </Box>
        <Box justifyContent="center" pl={5} pr={5}>
          <form>
            <FormControl variant="outlined" fullWidth={true} className={classes.formControl}>
              <InputLabel htmlFor="id1">State</InputLabel>
              <Select
                native
                value={staten}
                onChange={handleChange}
                label="State"
                inputProps={{
                  name: 'staten',
                  id: 'id1',
                }}
              >
                <option value="" />
                {data1.map((row, i) => (
                  <option key={i} value={row.state}>{row.state}</option>
                ))}
              </Select>
            </FormControl>
            {staten !== '-1' ? <Temp /> : ''}
          </form>
        </Box>
      </div>
    );
  }
}