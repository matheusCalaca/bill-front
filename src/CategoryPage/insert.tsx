import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../services/api';
import { Grid, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

interface CategoryResponse {
    id: number;
    name: string;
}



const InsertCategory = () => {


    const [openSlack, setOpenlack] = useState(false);

    const handleClick = () => {
        setOpenlack(true);
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenlack(false);
    };

    const [formData, setFormData] = useState({
        name: '',
    });

    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({
            ...formData, [name]: value
        })
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name } = formData;

        await api.post('/category', JSON.stringify({ 'name': name })).then(response => {
            let url: string = "http://" + window.location.host + "/categoria"
            window.location.replace(url);
        }).catch(err => {
            handleClick()
            console.log(err);

        })

    }

    return (
        <>
            <Grid container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography align="center" variant="h3">
                        Cadastro de Categoria
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid >
                        <Grid style={{ padding: 15 }}>

                            <TextField
                                id="name"
                                label="Categoria"
                                name="name"
                                onChange={handelInputChange}
                            />
                        </Grid>
                        <Grid style={{ padding: 10 }}>
                            <Button variant="contained" color="primary" type="submit">Cadastrar Categoria</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openSlack}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Erro ao cadastrar"
            />

        </>
    )
};

export default InsertCategory;