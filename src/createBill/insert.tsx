import { Grid, List, ListItem, ListItemIcon, ListItemText, TableFooter, TablePagination, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import React, { ChangeEvent, Component, FormEvent, Props, UIEvent, useEffect, useState } from 'react';
import api from '../services/api';
import SimpleDialog from '../createPayment';
import InfiniteScroll from 'react-infinite-scroll-component';



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

const InsertBill = () => {

    const [bills, setBills] = useState<BillResponse[]>([]);
    const [categorias, setCategorias] = useState<CategoryResponse[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsCount, setRowsCount] = useState<ConfTableResponse>();

    useEffect(() => {
        getListBills()
    }, []);



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
        if (bills.length < size || bills.length == 0) {
            setPage(page + 1)
            let url = `/bill?page=${page}&size=${5}`
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


    const [selectedCategory, setSelectedCategory] = useState('0');

    const [formData, setFormData] = useState({
        description: '',
        maturityDate: '',
        price: '',
    });

    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({
            ...formData, [name]: value
        })
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();


        const { description, maturityDate, price } = formData;

        const data = new FormData();

        data.append('description', description);
        data.append('maturityDate', maturityDate);
        data.append('price', price);
        data.append('categoryId', selectedCategory);


        var object: any = {};
        data.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);


        await api.post('/bill', json)
            .then(response => {
                alert("sucesso");
                getConfsTable();
            })


    }

    function handelSelectCategory(event: ChangeEvent<HTMLSelectElement>) {
        const category = event.target.value;
        setSelectedCategory(category);
    }

    async function deleteBill(id: number) {
        await api.delete(`/bill/${id}`).then(() => {
            getConfsTable();
        }).catch(err => {
            console.log(err);

        });
    }


    //dialog

    const [open, setOpen] = React.useState(false);
    const [billID, setBillID] = React.useState(0);


    const handleClickOpen = (value: number) => {
        setBillID(value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    return (
        <>




            <div >

                <div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1>Cadastro de Conta </h1>
                            <div className="field">
                                <label htmlFor="description">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    onChange={handelInputChange}
                                />
                            </div>


                            <div className="field">
                                <label htmlFor="price">
                                    Preço
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    onChange={handelInputChange}
                                />
                            </div>


                            <div className="field">
                                <label htmlFor="maturityDate">
                                    Data
                                </label>
                                <input
                                    type="date"
                                    name="maturityDate"
                                    id="maturityDate"
                                    onChange={handelInputChange}
                                />
                            </div>



                            <div className="field">
                                <label htmlFor="category">
                                    Categoria
                            </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={selectedCategory}
                                    onChange={handelSelectCategory}
                                >
                                    <option value="0">Selecione uma Categoria</option>
                                    {
                                        categorias.map(categoria => (
                                            <option key={categoria.id} value={categoria.id}> {categoria.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                    <SimpleDialog selectedId={billID} open={open} onClose={handleClose} />
                </div>
            </div>
        </>

    )
};

export default InsertBill;