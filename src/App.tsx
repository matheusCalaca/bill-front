import { AppBar, Container, Grid, Toolbar } from '@material-ui/core';
import React from 'react';
import CreateCategory from './createCategory';

function App() {
  return (
    <>
      <div>

        <AppBar >
          <Toolbar >
          </Toolbar>
        </AppBar>

        <main >
          <div />
          <Container  >
            <Grid >
              <CreateCategory />
            </Grid>
          </Container>
        </main>
      </div>
    </>
  );
}

export default App;
