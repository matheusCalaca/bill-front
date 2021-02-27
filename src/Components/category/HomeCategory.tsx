import { Grid, Typography, TextField, Select, Button, Snackbar, List, CardContent, ListItem, Card, Fab, CardActions, IconButton, Paper } from "@material-ui/core"
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { CategoriaContext } from '../../contexts/CategoriContext'
import { AddIcon } from '@material-ui/data-grid';
import api from '../../pages/api/api'
import styles from '../../styles/components/Bill.module.css';



export function HomeCategory() {

    const { categorias, reloadCategorias } = useContext(CategoriaContext);

    async function handleDelet(id: number) {
        await api.delete(`/category/${id}`)
        reloadCategorias()
    }

    const redirectPage = (page: string) => {
        let url: string = "http://" + window.location.host + "/" + page
        window.location.replace(url);
    };



    return (
        <div className={styles.content}>
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
            <div className={styles.fab}>
                <Fab color="primary" aria-label="add" onClick={() => redirectPage("criarCategoria")} >
                    <AddIcon />
                </Fab>
            </div>

        </div >
    );
}

