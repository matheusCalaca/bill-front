import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import api from '../services/api';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface CategoryResponse {
    id: number;
    name: string;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
            position: 'relative',
            minHeight: 200,
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const CreateCategory = () => {


    const [categorias, setCategorias] = useState<CategoryResponse[]>([])

    const classes = useStyles();

    useEffect(() => {
        getListCategori()
    }, []);

    function getListCategori() {
        api.get('/category/all').then(response => {
            setCategorias(response.data);
        })
    }

    async function handleDelet(id: number) {
        await api.delete(`/category/${id}`)
        getListCategori()
    }

    const redirectPage = (page: string) => {
        let url: string = "http://" + window.location.host + "/" + page
        window.location.replace(url);
    };


    return (
        <>
            <Grid container spacing={3}>
                <Grid item justify="center" xs={12}>
                    <Typography align="center" variant="h3">
                        Cateogry
                        </Typography>
                </Grid>
                <Grid container justify="center" spacing={2}>
                    {categorias.map(categoria => (
                        <Grid item key={categoria.id} >
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
            <Fab color="primary" className={classes.fab} aria-label="add" onClick={() => redirectPage("criarCategoria")} >
                <AddIcon />
            </Fab>
        </>
    )
};

export default CreateCategory;