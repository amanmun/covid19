import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as Icon from 'react-feather';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: "-2px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: 'inherit',
        marginBottom: "6px",
        marginTop: "6px"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

function EssComponents({ data: { data1_r } }) {

    const classes = useStyles();

    const initial = 1;
    const [staten, setStaten] = useState(-1)
    const [categ, setCateg] = useState(-1)
    const [cit, setCit] = useState(-1)

    if (!data1_r) {
        return (
            <div>
            </div>
        );
    }
    else {
        let state = []
        let category = []
        let city = []

        const handleChange1 = (event) => {
            setStaten(event.target.value);
        };

        const handleChange2 = (event) => {
            setCit(event.target.value);
        };

        const handleChange3 = (event) => {
            setCateg(event.target.value);
        };

        data1_r.forEach(function (element, i) {
            state.push(element.state)
        })
        state = state.filter((v, i, a) => a.indexOf(v) === i);

        if (staten !== -1) {
            data1_r.forEach(function (element, i) {
                if (element.state === staten)
                    city.push(element.city)
            })
            city = city.filter((v, i, a) => a.indexOf(v) === i);
        }
        if (cit !== -1) {
            data1_r.forEach(function (element, i) {
                if (element.city === cit)
                    category.push(element.category)
            })
            category = category.filter((v, i, a) => a.indexOf(v) === i);
        }

        function selectFunc(id, statevar, handlefunc, setVar, data, name) {
            return (
                <div>{statevar !== -1 ?
                    <FormControl fullWidth={true} variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor={id}>{name}</InputLabel>
                        <Select
                            value={setVar}
                            label={name}
                            onChange={handlefunc}
                            inputProps={{
                                name: name,
                                id: id,
                            }}
                        >
                            {data.map((row, i) => (
                                <MenuItem key={i} value={row}>{row}</MenuItem>
                            ))}
                        </Select>
                    </FormControl> : ''}</div>
            )
        }

        function essCard() {

            return (
                <div>{data1_r.map((row, i) => (<div>{staten === row.state && cit === row.city && categ === row.category ?
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {row.city}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {row.nameoftheorganisation}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {row.category}<br></br>{row.descriptionandorserviceprovided}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {row.description}
                            </Typography>
                            <Typography variant="button2" component="button2">
                                <Icon.PhoneOutgoing size="0.875rem" style={{marginRight: "5px"}} />{row.phonenumber}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" href={row.contact}>
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                    : ''}</div>))}
                </div>
            );
        }

        return (
            <div className={classes.root}>
                {selectFunc("id1", initial, handleChange1, staten, state, "State")}
                {staten !== -1 ? selectFunc("id2", staten, handleChange2, cit, city, "City") : ''}
                {cit !== -1 ? selectFunc("id3", cit, handleChange3, categ, category, "Category") : ''}
                {categ !== -1 ? essCard() : ''}
            </div>
        )
    }
}
export default EssComponents;