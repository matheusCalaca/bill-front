import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './loginPage/index'
import CreateBill from './createBill';
import CreateCategory from './CategoryPage';
import InsertCategory from './CategoryPage/insert';
import CreatePaymentMethod from './createInstituition';
import InsertInstution from './createInstituition/insert';


const  Routes = () => {
    return(
        <BrowserRouter>
            <Route component={LoginPage} path="/" exact />
            <Route component={CreateBill} path="/conta" />
            <Route component={CreateCategory} path="/categoria" />
            <Route component={InsertCategory} path="/criarCategoria" />
            <Route component={CreatePaymentMethod} path="/metodoPagamento" />
            <Route component={InsertInstution} path="/criarMetodoPagamento" />
        </BrowserRouter>
    );
}

export default Routes;