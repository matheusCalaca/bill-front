import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './loginPage/index'
import CreateBill from './createBill';
import CreateCategory from './createCategory';
import CreatePaymentMethod from './createInstituition';


const  Routes = () => {
    return(
        <BrowserRouter>
            <Route component={LoginPage} path="/" exact />
            <Route component={CreateBill} path="/conta" />
            <Route component={CreateCategory} path="/categoria" />
            <Route component={CreatePaymentMethod} path="/metodoPagamento" />
        </BrowserRouter>
    );
}

export default Routes;