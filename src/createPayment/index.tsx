import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { blue } from '@material-ui/core/colors';
import api from '../services/api';
import { Button, Grid, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import { GridColumnHeaderMenu } from '@material-ui/data-grid';


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});


interface PaymentMethodResponse {
    id: number;
    institutionName: string;
    paymentMethod: string;
}


export interface SimpleDialogProps {
    open: boolean;

    selectedId: number;
    onClose: () => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const classes = useStyles();
    const { onClose, selectedId, open } = props;


    const [openSlack, setOpenlack] = useState(false);

    const handleClickSlack = () => {
        setOpenlack(true);
    };

    const handleCloseSlack = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenlack(false);
    };



    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value: string) => {
        onClose();
    };

    const [formData, setFormData] = useState({

        datePayment: '',
        paymentMethodID: 0,
        description: '',
        receipt: '',
    });

    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({
            ...formData, [name]: value
        })
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { datePayment, paymentMethodID, description, receipt } = formData;

        const data = new FormData();

        data.append('billId', selectedId.toString());
        data.append('datePayment', datePayment);
        data.append('paymentMethodID', selectedPaymentMethod.toString());
        data.append('description', description);
        data.append('receipt', receipt);


        var object: any = {};
        data.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);
        console.log(json);

        await api.post('/payment', json)
            .then(response => {
                let url: string = "http://" + window.location.host + "/conta"
                window.location.replace(url);
                handleClose();
            }).catch(err => {
                handleClickSlack()
                console.log(err);

            })

    }

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('0');
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodResponse[]>([])


    function handelSelectPaymentMethod(event: ChangeEvent<HTMLSelectElement>) {
        const paymentMethod = event.target.value;
        setSelectedPaymentMethod(paymentMethod);
    }



    useEffect(() => {
        getListPaymentMethod()
    }, []);

    function getListPaymentMethod() {
        api.get('/paymentMethod/all').then(response => {
            setPaymentMethods(response.data);
        })
    }

    return (
        <>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogContent>
                    <DialogContentText >
                        <Grid container
                            spacing={2}
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Typography align="center" variant="h3">
                                    Realizar Pagamento
                            </Typography>
                            </Grid>
                            <form onSubmit={handleSubmit}>


                                <Grid style={{ padding: 15 }}>

                                    <TextField
                                        id="description"
                                        label="Descrição"
                                        name="description"
                                        onChange={handelInputChange}
                                    />
                                </Grid>


                                <Grid style={{ padding: 15 }}>

                                    <TextField
                                        id="receipt"
                                        label="Receipt"
                                        name="receipt"
                                        onChange={handelInputChange}
                                    />
                                </Grid>



                                <Grid style={{ padding: 15 }}>
                                    <Grid><span>Data de Pagamento</span></Grid>
                                    <TextField
                                        id="datePayment"
                                        name="datePayment"
                                        type="date"
                                        onChange={handelInputChange}
                                    />
                                </Grid>


                                <Grid style={{ padding: 15 }}>
                                    <Grid><span>Forma de Pagamento</span></Grid>
                                    <Select
                                        native
                                        value={selectedPaymentMethod}
                                        onChange={(e: any) => handelSelectPaymentMethod(e)}
                                    >
                                        <option value="0">Selecione</option>
                                        {
                                            paymentMethods.map(paymentMethod => (
                                                <option key={paymentMethod.id} value={paymentMethod.id}> {paymentMethod.institutionName} ({paymentMethod.paymentMethod}) </option>
                                            ))
                                        }
                                    </Select>
                                </Grid>

                                <Grid style={{ padding: 10 }}>
                                    <Button variant="contained" color="primary" type="submit">Pagar</Button>
                                </Grid>
                            </form>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openSlack}
                autoHideDuration={6000}
                onClose={handleCloseSlack}
                message="Erro ao cadastrar"
            />
        </>
    );
}
