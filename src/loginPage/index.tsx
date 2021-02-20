import { Button, Grid, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../services/apiUser';

interface LoginResponse {

    token: string;
    duration: string;
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
            localStorage.removeItem('duration');
            let url: string = "http://" + window.location.host + "/"
            window.location.replace(url);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('duration', response.data.duration);
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
                        <h1>Login {process.env.NODE_ENV} / {process.env.TESTE}</h1>
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