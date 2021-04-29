import React, {useEffect, useState} from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import {Link, Redirect, useHistory} from 'react-router-dom';
import API from '../../api';


export default function SignIn(props) {
    const [credentials, setCredentials] = useState({'name': '', 'password': ''})
    const [signUp, setSignUp] = useState(props.signUp);
    const toggleSignUp = () => {setSignUp(!signUp)};
    let setLogin = props.setLogin;
    let isLoggedIn = props.isLoggedIn;
    const history = useHistory();

    let handleChange = (object, setObject) => (event) => {
        const { name, value} = event.target;
        setObject({ ...object, [name]: value });
    }

    const handleSignIn = (credentials) => {
        console.log(credentials);
        API.get(`users/search/findByNameIgnoreCase?name=${credentials.name}`)
            .then((res) => {
                console.log(res.data._embedded);
                return res.data._embedded.users;
            })
            .then((creds) => {
                console.log(creds);
                if (creds.some((cred) => {
                    if (cred.password == credentials.password) {
                        return true
                    }}))
                {
                    setLogin(true);
                    history.push('/');
                } else {
                    setLogin(false);
                    alert("Invalid credentials");
                }
            })
    }

    const handleSignUp = (credentials) => {
        console.log(credentials);
        API.post(`/users`, credentials)
        .then((data) => {
            console.log(data);
            setLogin(true);
            history.push('/');
        })
    }

    const handleLogOut = () => {
        setLogin(false);
        history.push('/');
    }

    
    
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="outer-container"
            >
            <Grid item md={8}
                container
                direction="column"
                justify="center"
                alignItems="flex-start">
                    <TextField name="name" label="Username" className="input-field" onChange={handleChange(credentials, setCredentials)}/>
                    <TextField name="password" label="Password" type="password" className="input-field" onChange={handleChange(credentials, setCredentials)}/>
                    {
                        signUp ?
                            (
                            <div>
                                <Button variant="contained" color="primary" onClick={() => handleSignUp(credentials)}>Sign Up</Button>
                                <div>Already have an account? <a href='#' onClick={toggleSignUp}>Sign In</a></div>
                            </div>
                            ) :
                            (
                            <div>
                                <Button variant="contained" color="primary" onClick={() => handleSignIn(credentials)}>Sign In</Button>
                                <div>Don't have an account? <a href='#' onClick={toggleSignUp}>Sign Up</a></div>
                            </div>
                            )
                    }



            </Grid>

        </Grid>
    );
}