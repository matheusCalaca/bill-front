import { Button, createStyles, Fab, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { AddIcon } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface PaymentMethodResponse {
    id: number;
    institutionName: string;
    paymentMethod: string;
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

const CreatePaymentMethod = () => {

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodResponse[]>([])

    const classes = useStyles();

    useEffect(() => {
        getListPaymentMethod()
    }, []);

    function getListPaymentMethod() {
        api.get('/paymentMethod/all').then(response => {
            setPaymentMethods(response.data);
        })
    }


    async function handleDelet(id: number) {
        await api.delete(`/paymentMethod/${id}`)
        getListPaymentMethod()
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
                        Metodo de Pagamento
                    </Typography>
                </Grid>
                <Grid container justify="center" spacing={2}>
                    {paymentMethods.map(paymentMethod => (
                        <Grid item key={paymentMethod.id} >
                            <Paper key={paymentMethod.id} >
                                <Grid container >
                                    <Grid alignContent="center">
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
            <Fab color="primary" className={classes.fab} aria-label="add" onClick={() => redirectPage("criarMetodoPagamento")} >
                <AddIcon />
            </Fab>
        </>
    )
};

export default CreatePaymentMethod;