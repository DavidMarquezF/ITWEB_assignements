import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import { LoginPageTypes } from './LoginPageTypes';

const styles : Object = {
    root: {
        maxWidth: 1440,
        flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    },
    paper: {
        padding: 20,
    },
    form: {
        '& .MuiTextField-root': {
        margin: 10,
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
};

export class LoginPage extends React.Component<{}, {description:string; value1: string; value2:string}> {
    static defaultProps: { loginAction: string; registerAction:string; method: string; };

    //const classes = useStyles();

    constructor(props:LoginPageTypes) {
        super(props);

        this.state = {  description: '',
                        value1: '',
                        value2: '' };
    }

    onNameChange(e:any) {
        this.setState({
            value1: e.target.value
        });
    }

    onPwdChange(e:any) {
        this.setState({
            value2: e.target.value
        });
    }

    onSubmit(e:any) {
        e.preventDefault();

        fetch(this.props.formAction, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: this.state.description})
        });

        this.setState({description: ''});
    }


    render (){
        return(
            <div>
            <Paper>
            <h1>Login</h1>
            <form noValidate autoComplete="off" action={LoginPage.defaultProps.loginAction} method="post" onSubmit={this.onSubmit}>
                <TextField id="name" label="Username" variant="outlined" value={this.state.value1} onChange={this.onNameChange} required/>
                <TextField id="password" label="Password" variant="outlined" value={this.state.value2} onChange={this.onNameChange} type="password" required/>
                <Button variant="contained" size="large" color="primary" type="submit" startIcon={<LockIcon/>}>Login</Button>
            </form>
            <br/><br/>
            <div>
                <p>Haven't got an account yet?</p>
                <form noValidate autoComplete="off" action={LoginPage.defaultProps.registerAction} method="post" onSubmit={this.onSubmit}>
                    <TextField id="name" label="Username" variant="outlined" value={this.state.value1} onChange={this.onNameChange} required/>
                    <TextField id="password" label="Password" variant="outlined" value={this.state.value2} onChange={this.onNameChange} type="password" required/> 
                    <Button variant="outlined" size="large" color="primary" type="submit" startIcon={<LockIcon/>}>Register</Button>
                </form>
                
            </div>
            </Paper>
        </div>
        )
    }
}

LoginPage.defaultProps = {
    loginAction: 'http://localhost:3000/api/login',
    registerAction: 'http://localhost:3000/api/register',
    method: 'post'
};

module.exports = LoginPage;