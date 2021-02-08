import { TableFooter, TablePagination } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../services/api';


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


const CreateBill = () => {

    const [bills, setBills] = useState<BillResponse[]>([]);
    const [categorias, setCategorias] = useState<CategoryResponse[]>([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowsCount, setRowsCount] = useState<ConfTableResponse>();

    useEffect(() => {
        getListBills(page, rowsPerPage)

        // preload
        const pagePreload = (0 + 1) * rowsPerPage;
        getListBills(pagePreload, rowsPerPage)
    }, []);



    useEffect(() => {
        getListCategoras()
    }, []);

    function getListCategoras() {
        api.get('/category/all').then(response => {
            setCategorias(response.data);
        })
    }


    async function getListBills(page: number, size: number) {
        let url = `/bill?page=${page}&size=${size}`
        await api.get(url).then(response => {

            if (bills.length == 0 || bills.length === (page) || bills.length === (page + size)) {
                let data: BillResponse[] = response.data;
                data.forEach(function (bill) { bills.push(bill) })
                console.log(bills);

            }

            setBills(bills);
        })
    }


    // const [formData, setFormData] = useState({
    //     name: '',
    // });
    // function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
    //     const { name, value } = event.target
    //     setFormData({
    //         ...formData, [name]: value
    //     })
    // }


    // async function handleSubmit(event: FormEvent) {
    //     event.preventDefault();

    //     const { name } = formData;

    //     await api.post('/category', JSON.stringify({ 'name': name }))

    //     getListCategori()

    // }

    // async function handleDelet(id: number) {
    //     await api.delete(`/category/${id}`)
    //     getListCategori()
    // }

    useEffect(() => {
        getConfsTable()
    }, []);

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


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        // preload
        const pagePreload = (newPage + 1) * rowsPerPage;
        getListBills(pagePreload, rowsPerPage)
        setPage(newPage);
    };

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
        console.log(json);
        console.log(localStorage.getItem('token'));


        await api.post('/bill', json)
            .then(response => {
                alert("sucesso");
                getConfsTable();
            })


        // getListCategori()

    }

    function handelSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const category = event.target.value;
        setSelectedCategory(category);
    }


    return (
        <>
            <div>
                <h1>Conta</h1>
                <div>
                    {/* <button onClick={(e) => handleDelet(categoria.id)}>X</button> */}
                    <div>
                        page = {page} <br />
                        rowsPerPage = {rowsPerPage}
                    </div>
                    <TableContainer component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">Identificador</TableCell>
                                    <TableCell align="right">Descrição</TableCell>
                                    <TableCell align="right">Categoria</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? bills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : bills
                                ).map((bill) => (
                                    <TableRow key={bill.id}>
                                        <TableCell component="th" scope="row">
                                            {bill.id}
                                        </TableCell>
                                        <TableCell align="right">{bill.ownerIdentification}</TableCell>
                                        <TableCell align="right">{bill.description}</TableCell>
                                        <TableCell align="right">{bill.category.name}</TableCell>
                                        <TableCell align="right">{bill.status}</TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 33 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[10]}
                                        colSpan={3}
                                        count={sizeQt}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                                    // ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
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
                                onChange={handelSelectUf}
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
            </div>
        </>
    )
};

export default CreateBill;