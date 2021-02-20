import { Button, Card, CardActions, CardContent, createStyles, Fab, Grid, IconButton, List, ListItem, ListItemText, makeStyles, Select, Theme, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../services/api';
import SimpleDialog from '../createPayment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddIcon } from '@material-ui/data-grid';
import { count } from 'console';



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

interface monthSelect {
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
        getConfsTable()

        getListCategoras()
        listYear()
        getListBills()
    }, []);

    const classes = useStyles();



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
            let realmonth = month + 1
            console.log(realmonth);

            let url = `/bill?page=${page}&size=${15}&year=${year}&month=${realmonth}`
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


    async function getConfsTable() {

        let realmonth = month + 1
        let url = `/bill/confTable?year=${year}&month=${realmonth}`
        await api.get(url).then(response => {
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

    function footerLoad(billSize: number, maxBills: number | undefined): string {
        let size: number = maxBills === undefined ? 0 : maxBills

        if (billSize === size) {
            return " " + billSize + " - " + size
        }

        return " Carregando " + billSize + " - " + size
    }



    function listYear() {
        let listYear: Array<number> = [];
        let dataBase: number = new Date().getFullYear() - 2;

        for (dataBase; dataBase <= new Date().getFullYear(); dataBase++) {
            listYear.push(dataBase)
        }

        setYearOptions(listYear)
    }

    const [yearOptions, setYearOptions] = useState<Array<number>>([]);


    const [year, setYear] = useState<number>(new Date().getFullYear());

    const handleChangeSelectYear = (event: ChangeEvent<{ value: unknown }>) => {
        const year = event.target.value as number;
        setYear(year);
    };

    useEffect(() => {
        reloadBills()
    }, [year]);


    function reloadBills() {
        setBills([]);
        getConfsTable();
        getListBills();
    }


    const monthOptions: Array<monthSelect> = [{ id: 0, name: 'Janeiro' }, { id: 1, name: 'Fevereiro' }, { id: 2, name: 'Março' }, { id: 3, name: 'Abril' }, { id: 4, name: 'Maio' }, { id: 5, name: 'Junho' }, { id: 6, name: 'Julho' }, { id: 7, name: 'Agosto' }, { id: 8, name: 'Setembro' }, { id: 9, name: 'Outubro' }, { id: 10, name: 'Novembro' }, { id: 11, name: 'Dezembro' }]

    const [month, setMonth] = useState<number>(new Date().getMonth());

    const handleChangeSelectMonth = (event: ChangeEvent<{ value: unknown }>) => {
        let month = event.target.value as number;
        setMonth(month + 1);
    };


    return (
        <>

            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item justify="center" xs={12}>
                    <Grid >
                        <Typography align="center" variant="h3">
                            Conta {month}/{year}
                        </Typography>
                    </Grid>

                    <Grid container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"

                    >
                        <Grid >
                            <Select
                                native
                                value={year}
                                onChange={handleChangeSelectYear}
                            >
                                {yearOptions.map(ano => (<option value={ano}>{ano}</option>))}

                            </Select>
                        </Grid>

                        <Grid>
                            <Select
                                native
                                value={month}
                                onChange={handleChangeSelectMonth}

                            >
                                {monthOptions.map(mes => (<option value={mes.id}>{mes.name}</option>))}

                            </Select>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item justify="center" xs={12}>

                    <List component="nav" aria-label="main mailbox folders">
                        <InfiniteScroll
                            dataLength={bills.length}
                            next={getListBills}
                            hasMore={true}
                            loader={<React.Fragment>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <h4>{footerLoad(bills.length, rowsCount?.size)}</h4>
                                </Grid>
                            </React.Fragment>}
                        >
                            {bills.map(bill => (


                                <ListItem
                                >

                                    <Grid>
                                        <Card variant="outlined"
                                            className={classes.muiGridRoot}
                                            style={{ backgroundColor: colorList(bill.status), width: '100%' }}
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
            </Grid >
            <SimpleDialog selectedId={billID} open={open} onClose={handleClose} />
            <Fab color="primary" className={classes.fab} aria-label="add" onClick={() => redirectPage("criarBill")} >
                <AddIcon />
            </Fab>
        </>

    )
};

export default CreateBill;