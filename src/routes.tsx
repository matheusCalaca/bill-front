import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './loginPage/index'
import PrincipalPage from './principalPage/index'

const  Routes = () => {
    return(
        <BrowserRouter>
            <Route component={LoginPage} path="/" exact />
            <Route component={PrincipalPage} path="/principalPage" exact />
            {/* <Route component={CreatePoint} path="/creat-point" /> */}
        </BrowserRouter>
    );
}

export default Routes;