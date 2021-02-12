import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import api from '../services/api';


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
            handleClose();
        });

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
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">realizar pagamento</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="description">
                                Descrição
                                </label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                onChange={handelInputChange}
                            />
                        </div>


                        <div className="field">
                            <label htmlFor="receipt">
                                receipt
                                </label>
                            <input
                                type="text"
                                name="receipt"
                                id="receipt"
                                onChange={handelInputChange}
                            />
                        </div>


                        <div className="field">
                            <label htmlFor="datePayment">
                                Data
                                </label>
                            <input
                                type="date"
                                name="datePayment"
                                id="datePayment"
                                onChange={handelInputChange}
                            />
                        </div>


                        <div className="field">
                            <label htmlFor="category">
                                Categoria
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={selectedPaymentMethod}
                                onChange={handelSelectPaymentMethod}
                            >
                                <option value="0">Selecione uma forma de pagamento</option>
                                {
                                    paymentMethods.map(paymentMethod => (
                                        <option key={paymentMethod.id} value={paymentMethod.id}> {paymentMethod.institutionName} ({paymentMethod.paymentMethod}) </option>
                                    ))
                                }
                            </select>
                        </div>

                        <button type="submit">pagar</button>
                    </form>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
