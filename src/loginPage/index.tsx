import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../services/apiUser';

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

        await api.post('/user/login', JSON.stringify({ 'email': email, 'password': password })).then(response => {
            console.log(response.data);
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
};

export default LoginPage;