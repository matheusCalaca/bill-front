import { Button, Grid, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState, Component } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import api from '../services/apiUser';

interface LoginResponse {

    token: string;
}

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({
            ...formData, [name]: value
        })
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { email, password } = formData;

        await api.post<LoginResponse>('/user/login', JSON.stringify({ 'email': email, 'password': password })).then(response => {
            localStorage.removeItem('token');
            let url: string = "http://" + window.location.host + "/conta"
            window.location.replace(url);
            localStorage.setItem('token', response.data.token);
        })

    }

    return (
        <>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center" >
                <form onSubmit={handleSubmit}>
                    <Grid>
                        <h1>Login</h1>
                    </Grid>
                    <Grid>
                        <TextField id="email" label=" E-MAIL" variant="filled" type="text" name="email" onChange={handelInputChange} />
                    </Grid>
                    <Grid>
                        <TextField id="password" label="Senha" variant="filled" type="password" name="password" onChange={handelInputChange} />
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Button type="submit" color="primary" size="large" >Login</Button>
                    </Grid>
                </form>
            </Grid >
        </>
    )
};

export default LoginPage;