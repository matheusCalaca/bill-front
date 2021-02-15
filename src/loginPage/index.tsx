import { Button } from '@material-ui/core';
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
            localStorage.setItem('token', response.data.token);
            let url: string = "http://" + window.location.host + "/conta"
            window.location.replace(url);
        })

    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="field">
                        <label htmlFor="name">
                            E-MAIL
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="eamil"
                            onChange={handelInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handelInputChange}
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </>
    )
};

export default LoginPage;