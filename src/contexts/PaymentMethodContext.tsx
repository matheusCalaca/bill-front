import { createContext, useState, ReactNode, useEffect } from 'react';
import api from '../pages/api/api'


interface PaymentMethodResponse {
    id: number;
    institutionName: string;
    paymentMethod: string;
}

interface PaymentMethodContextData {
    paymentMethods: PaymentMethodResponse[];
    reloadPaymentMethod: () => void;
}

interface PaymentMethodProviderProps {
    children: ReactNode;
    paymentMethods: PaymentMethodResponse[];
}

export const PaymentMethodContext = createContext({} as PaymentMethodContextData);

export function PaymentMethodProvider({
    children,
    ...rest
}: PaymentMethodProviderProps) {

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodResponse[]>(rest.paymentMethods ?? [])

    async function reloadPaymentMethod() {
        await api.get('/paymentMethod/all').then(response => {
            setPaymentMethods(response.data);
        })
    }


    return (
        <PaymentMethodContext.Provider
            value={{
                paymentMethods,
                reloadPaymentMethod
            }}
        >
            {children}

        </PaymentMethodContext.Provider>
    );
}

