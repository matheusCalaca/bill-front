import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './loginPage/index'
import CreateBill from './createBill';
import CreateCategory from './CategoryPage';
import CreatePaymentMethod from './createInstituition';
import InsertCategory from './CategoryPage/insert';


const  Routes = () => {
    return(
        <BrowserRouter>
            <Route component={LoginPage} path="/" exact />
            <Route component={CreateBill} path="/conta" />
            <Route component={CreateCategory} path="/categoria" />
            <Route component={CreatePaymentMethod} path="/metodoPagamento" />
            <Route component={InsertCategory} path="/criarCategoria" />
        </BrowserRouter>
    );
}

export default Routes;