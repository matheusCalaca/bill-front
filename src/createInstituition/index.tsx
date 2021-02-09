import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../services/api';

interface PaymentMethodResponse {
    id: number;
    institutionName: string;
    paymentMethod: string;
}


const CreatePaymentMethod = () => {

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodResponse[]>([])


    useEffect(() => {
        getListPaymentMethod()
    }, []);

    function getListPaymentMethod() {
        api.get('/paymentMethod/all').then(response => {
            setPaymentMethods(response.data);
        })
    }


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

        await api.post('/paymentMethod', JSON.stringify({ 'institutionName': institutionName, 'paymentMethod': paymentMethod }))

        getListPaymentMethod()

    }

    async function handleDelet(id: number) {
        await api.delete(`/paymentMethod/${id}`)
        getListPaymentMethod()
    }


    return (
        <>
            <div>
                <h1>Payment Method</h1>
                <div>
                    <ul>
                        {paymentMethods.map(paymentMethod => (<li key={paymentMethod.id}> Institution Name: {paymentMethod.institutionName} ({paymentMethod.paymentMethod}) <button onClick={(e) => handleDelet(paymentMethod.id)}>X</button></li>))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="institutionName">
                            Institution Name
                        </label>
                        <input
                            type="text"
                            name="institutionName"
                            id="institutionName"
                            onChange={handelInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="paymentMethod">
                            Payment Method
                        </label>
                        <input
                            type="text"
                            name="paymentMethod"
                            id="paymentMethod"
                            onChange={handelInputChange}
                        />
                    </div>
                    <button type="submit">Cadastrar Payment Method</button>
                </form>
            </div>
        </>
    )
};

export default CreatePaymentMethod;