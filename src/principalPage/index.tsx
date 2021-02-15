import { Grid } from '@material-ui/core';
import React from 'react';
import CreateBill from '../createBill';
import CreateCategory from '../createCategory';
import CreatePaymentMethod from '../createInstituition';


const PrincipalPage = () => {

    return (
        <>
            <Grid >
              <CreateBill />
            </Grid>
            <hr />
            <Grid >
              <CreateCategory />
            </Grid>
            <hr />
            <Grid >
              <CreatePaymentMethod />
            </Grid> 
        </>
    )
};

export default PrincipalPage;