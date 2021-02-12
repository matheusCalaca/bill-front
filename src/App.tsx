import { AppBar, Container, Grid, Toolbar } from '@material-ui/core';
import React from 'react';
import CreateBill from './createBill';
import CreateCategory from './createCategory';
import CreatePaymentMethod from './createInstituition';

import LoginPage from './loginPage';

function App() {
  return (
    <>
      <div>
        {/* 
        <AppBar >
          <Toolbar >
          </Toolbar>
        </AppBar> */}

        <main >
          <div />
          <Container  >
            <Grid>
              <LoginPage />
            </Grid>
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
          </Container>
        </main>
      </div>
    </>
  );
}

export default App;
