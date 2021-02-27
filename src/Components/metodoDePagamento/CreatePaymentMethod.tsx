import { Grid, Typography, TextField, Select, Button, Snackbar } from "@material-ui/core"
import api from '../../pages/api/api'
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CategoriaContext } from '../../contexts/CategoriContext'
import { PaymentMethodContext } from "../../contexts/PaymentMethodContext";

export function CreatePaymentMethod() {


    const { reloadPaymentMethod  } = useContext(PaymentMethodContext);
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
        institutionName: '',
        paymentMethod: '',
    });


    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({
            ...formData, [name]: value
        })
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { institutionName, paymentMethod } = formData;

        await api.post('/paymentMethod', JSON.stringify({ 'institutionName': institutionName, 'paymentMethod': paymentMethod })).then(response => {
            // let url: string = "http://" + window.location.host + "/metodoPagamento"
            // window.location.replace(url);
            reloadPaymentMethod;
        }).catch(err => {
            handleClick()
            console.log(err);
            
        })

    }



    return (
        <div>
            <Grid container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography align="center" variant="h3">
                        Metodo de Pagamento
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid style={{ padding: 15 }}>

                            <TextField
                                id="institutionName"
                                label="Institution Name"
                                name="institutionName"
                                onChange={handelInputChange}
                            />
                        </Grid>
                        <Grid style={{ padding: 15 }}>

                            <TextField
                                id="paymentMethod"
                                label="Metodo de Pagamento"
                                name="paymentMethod"
                                onChange={handelInputChange}
                            />
                        </Grid>
                        <Grid style={{ padding: 10 }}>
                            <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
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
                message="Note archived"
            />
        </div >
    );
}

