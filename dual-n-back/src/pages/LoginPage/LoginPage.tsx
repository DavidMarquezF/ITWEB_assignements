import React from "react";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1440,
        flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    },
    paper: {
        padding: 20,
    },
    form: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        },
        flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    },
    headline: {
        fontSize: 36,
        textAlign: "center",
    },
    registerDiv: {
        textAlign: "center",
    },
}));

export const LoginPage = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <h1 className={classes.headline}>Login</h1>
            <form className={classes.form} noValidate autoComplete="off" action="http://localhost:3000/api/login" method="post">
                <TextField id="name" label="Username" variant="outlined" required/>
                <TextField id="password" label="Password" variant="outlined" type="password" autoComplete="current-password" required/>
                <Button variant="contained" size="large" color="primary" type="submit" startIcon={<LockIcon/>}>Login</Button>
            </form>
            <br/><br/>
            <div className={classes.registerDiv}>
                <p>Haven't got an account yet?</p>
                <form className={classes.form} noValidate autoComplete="off" action="http://localhost:3000/api/register" method="post">
                    <TextField id="name" label="Username" variant="outlined" required/>
                    <TextField id="password" label="Password" variant="outlined" type="password" autoComplete="current-password" required/> 
                    <Button variant="outlined" size="large" color="primary" type="submit" startIcon={<LockIcon/>}>Register</Button>
                </form>
                
            </div>
            </Paper>
        </div>
    )
}