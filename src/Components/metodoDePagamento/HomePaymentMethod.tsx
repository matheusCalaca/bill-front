import { Grid, Typography, TextField, Select, Button, Snackbar, List, CardContent, ListItem, Card, Fab, CardActions, IconButton, Paper } from "@material-ui/core"
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { CategoriaContext } from '../../contexts/CategoriContext'
import { AddIcon } from '@material-ui/data-grid';
import api from '../../pages/api/api'
import styles from '../../styles/components/Bill.module.css';
import { PaymentMethodContext } from "../../contexts/PaymentMethodContext";



export function HomePaymentMethod() {

    const { paymentMethods, reloadPaymentMethod } = useContext(PaymentMethodContext);

    async function handleDelet(id: number) {
        await api.delete(`/paymentMethod/${id}`);
        reloadPaymentMethod;
    }

    const redirectPage = (page: string) => {
        let url: string = "http://" + window.location.host + "/" + page
        window.location.replace(url);
    };




    return (
        <div className={styles.content}>
            <Grid  >
                <Grid item xs={12}>
                    <Typography align="center" variant="h3">
                        Metodo de Pagamento
                    </Typography>
                </Grid>
                <Grid>
                    {paymentMethods.map(paymentMethod => (
                        <Grid item key={paymentMethod.id} >
                            <Paper key={paymentMethod.id} >
                                <Grid  >
                                    <Grid >
                                        <Typography align="center" variant="h5" style={{ padding: 5 }}>
                                            {paymentMethod.institutionName} ({paymentMethod.paymentMethod})
                                        </Typography>
                                    </Grid>
                                    <Grid style={{ padding: 5 }}>
                                        <Button onClick={(e) => handleDelet(paymentMethod.id)}>X</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                    )}
                </Grid>
            </Grid>
            <div className={styles.fab}>
                <Fab color="primary" aria-label="add" onClick={() => redirectPage("criarMetodoPagamento")} >
                    <AddIcon />
                </Fab>
            </div>

        </div >
    );
}

