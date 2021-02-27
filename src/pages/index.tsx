import { useState } from "react";
import { AppBar, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import styles from '../styles/pages/Global.module.css';
import { AccountBalance, AllInbox, Description } from "@material-ui/icons";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CreateBill } from "../Components/Bill/create/CreateBill";
import { HomeBill } from "../Components/Bill/HomeBill";
import { GetServerSideProps } from "next";
import { CategoriaProvider } from '../contexts/CategoriContext'
import api from './api/api'
import { HomeCategory } from "../Components/category/HomeCategory";
import { CreateCategory } from "../Components/category/CreateCategory";


interface CategoryResponse {
    id: number;
    name: string;
}


interface CategoriasContextData {
    categorias: CategoryResponse[];
}


export default function Home(props: CategoriasContextData) {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const redirectPage = (page: string) => {
        let url: string = "http://" + window.location.host + "/" + page
        window.location.replace(url);
    };


    return (
        <div>
            <div className={styles.root}>
                <div>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={styles.appBarShift}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={styles.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                Programa de Gerenciamento de Contas
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center">
                            <IconButton onClick={handleDrawerClose} >
                                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </Grid>
                        <Divider />
                        <List>
                            <ListItem button key="bill" onClick={() => redirectPage("conta")}>
                                <Grid container >
                                    <Grid >
                                        <ListItemIcon ><Description></Description> </ListItemIcon>
                                    </Grid>
                                    <Grid >
                                        <ListItemText primary="Conta" />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem button key="category" onClick={() => redirectPage("categoria")} >
                                <Grid container >
                                    <Grid >
                                        <ListItemIcon ><AllInbox></AllInbox> </ListItemIcon>
                                    </Grid>
                                    <Grid >
                                        <ListItemText primary="categoria" />
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem button key="metodoPagamento" onClick={() => redirectPage("metodoPagamento")}>
                                <Grid container >
                                    <Grid >
                                        <ListItemIcon ><AccountBalance></AccountBalance> </ListItemIcon>
                                    </Grid>
                                    <Grid >
                                        <ListItemText primary="metodoPagamento" />
                                    </Grid>
                                </Grid>
                            </ListItem>

                        </List>
                    </Drawer>
                </div>
                <main className={styles.content}>
                    <CategoriaProvider categorias={props.categorias}>
                        {/* <CreateBill /> */}
                        <HomeCategory />
                        <CreateCategory />
                    </CategoriaProvider>
                    {/* <HomeBill /> */}
                </main>
            </div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let categorias: CategoryResponse[] = []
    await api.get('/category/all').then(response => {
        categorias = response.data;
    })

    return {
        props: {
            categorias: categorias,
        },
    };
};