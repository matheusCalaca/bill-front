import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './loginPage/index'
import CreateBill from './createBill';
import CreateCategory from './CategoryPage';
import InsertCategory from './CategoryPage/insert';
import CreatePaymentMethod from './metodoDePagamento';
import InsertInstution from './metodoDePagamento/insert';
import InsertBill from './createBill/insert';


const  Routes = () => {
    return(
        <BrowserRouter>
            <Route component={CreateBill} path="/" exact />
            <Route component={CreateBill} path="/conta" />
            <Route component={InsertBill} path="/criarBill" />
            <Route component={CreateCategory} path="/categoria" />
            <Route component={InsertCategory} path="/criarCategoria" />
            <Route component={CreatePaymentMethod} path="/metodoPagamento" />
            <Route component={InsertInstution} path="/criarMetodoPagamento" />
        </BrowserRouter>
    );
}

export default Routes;