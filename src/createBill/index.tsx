import { Button, Card, CardActions, CardContent, createStyles, Fab, Grid, IconButton, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SimpleDialog from '../createPayment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddIcon } from '@material-ui/data-grid';



interface ConfTableResponse {
    size: number;
}

interface CategoryResponse {
    id: number;
    name: string;
}

interface BillResponse {
    id: number,
    category: CategoryResponse,
    description: string,
    maturityDate: Date,
    ownerIdentification: string,
    price: number,
    status: string
}


interface CategoryResponse {
    id: number;
    name: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
            position: 'relative',
            minHeight: 200,
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        muiGridRoot: {
            width: '100%',
        },
    }),
);

const CreateBill = () => {

    const [bills, setBills] = useState<BillResponse[]>([]);
    const [categorias, setCategorias] = useState<CategoryResponse[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsCount, setRowsCount] = useState<ConfTableResponse>();

    useEffect(() => {
        getListBills()
    }, []);

    const classes = useStyles();

    useEffect(() => {
        getConfsTable()

        getListCategoras()
    }, []);

    function getListCategoras() {
        api.get('/category/all').then(response => {
            setCategorias(response.data);
        })
    }


    async function getListBills() {
        let size: number = rowsCount?.size === undefined ? 0 : rowsCount.size
        let page = bills.length
        if (bills.length < size || bills.length === 0) {
            setPage(page + 1)
            let url = `/bill?page=${page}&size=${15}`
            await api.get(url).then(response => {
                let billResponse = response.data;
                let data: BillResponse[] = billResponse;
                data.forEach(function (bill) {
                    setBills(b => [...b, bill]);
                })
            })
        }
    }


    let sizeQt = rowsCount?.size == null ? 0 : rowsCount?.size;

    let emptyRows = rowsPerPage - Math.min(rowsPerPage, sizeQt - page * rowsPerPage);


    function getConfsTable() {
        let url = `/bill/confTable`
        api.get(url).then(response => {
            setRowsCount(response.data);
        });

        sizeQt = rowsCount?.size == null ? 0 : rowsCount?.size;
        emptyRows = rowsPerPage - Math.min(rowsPerPage, sizeQt - page * rowsPerPage);
    }

    async function deleteBill(id: number) {
        await api.delete(`/bill/${id}`).then(() => {
            getConfsTable();
        }).catch(err => {
            console.log(err);
            redirectPage("conta");
        });
    }


    //dialog

    const [open, setOpen] = React.useState(false);
    const [billID, setBillID] = React.useState(0);


    const handleClickOpen = (value: number, status: string) => {
        if (status != 'PAYMENT') {
            setBillID(value);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };



    function colorList(status: string) {
        if (status == "OPEN") {
            return ""
        }
        if (status == "PAYMENT") {
            return "limegreen"
        }
    }

    const redirectPage = (page: string) => {
        let url: string = "http://" + window.location.host + "/" + page
        window.location.replace(url);
    };




    return (
        <>

            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item justify="center" xs={12}
                >
                    <Typography align="center" variant="h3">
                        Conta {bills.length} - {rowsCount?.size}
                    </Typography>
                </Grid>


                <List component="nav" aria-label="main mailbox folders"

                >
                    <InfiniteScroll
                        dataLength={bills.length}
                        next={getListBills}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    >
                        {bills.map(bill => (


                            <ListItem
                            >

                                <Grid>
                                    <Card variant="outlined"
                                        className={classes.muiGridRoot}
                                        style={{ backgroundColor: colorList(bill.status) ,   width: '100%'}}
                                        key={bill.id}>
                                        <CardContent onClick={() => handleClickOpen(bill.id, bill.status)}>
                                            <Typography color="textPrimary" variant="h2">
                                                {bill.description}
                                            </Typography>
                                            <br />
                                            <Typography variant="h5">
                                                {" R$" + bill.price}

                                                {"ID: " + bill.id + " Status: " + bill.status}
                        
                                                {"Data de Vencimento: " + bill.maturityDate}
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <IconButton aria-label="delete" onClick={() => deleteBill(bill.id)} disabled={bill.status == 'PAYMENT'}>
                                                <DeleteIcon />
                                            </IconButton>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            </ListItem>
                        ))}
                    </InfiniteScroll>

                </List>
            </Grid>
            <SimpleDialog selectedId={billID} open={open} onClose={handleClose} />
            <Fab color="primary" className={classes.fab} aria-label="add" onClick={() => redirectPage("criarBill")} >
                <AddIcon />
            </Fab>
        </>

    )
};

export default CreateBill;