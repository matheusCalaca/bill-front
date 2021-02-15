import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../services/api';
import { Grid, Paper, Typography } from '@material-ui/core';

interface CategoryResponse {
    id: number;
    name: string;
}


const CreateCategory = () => {


    const [categorias, setCategorias] = useState<CategoryResponse[]>([])

    useEffect(() => {
        getListCategori()
    }, []);

    function getListCategori() {
        api.get('/category/all').then(response => {
            setCategorias(response.data);
        })
    }


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

        await api.post('/category', JSON.stringify({ 'name': name }))


        getListCategori()

    }

    async function handleDelet(id: number) {
        await api.delete(`/category/${id}`)
        getListCategori()
    }


    return (
        <>
            <div>
                <Grid container spacing={3}>
                    <Grid item justify="center" xs={12}>
                        <Typography align="center" variant="h3">
                            Cateogry
                        </Typography>
                    </Grid>
                    <Grid container justify="center" spacing={2}>
                        {categorias.map(categoria => (
                            <Grid item >
                                <Paper key={categoria.id} >
                                    <Grid container >
                                        <Grid alignContent="center">
                                            <Typography align="center" variant="h5" style={{ padding: 5 }}>
                                                {categoria.name}
                                            </Typography>
                                        </Grid>
                                        <Grid style={{ padding: 5 }}>
                                            <Button onClick={(e) => handleDelet(categoria.id)}>X</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                        )}
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br></br> Categoria</h1>
                    <div className="field">

                        <TextField
                            id="name"
                            label="Categoria"
                            name="name"
                            onChange={handelInputChange}
                        />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" type="submit">Cadastrar Catgoria</Button>
                    </div>
                </form>
            </div>
        </>
    )
};

export default CreateCategory;