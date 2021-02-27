import { Grid, Typography, TextField, Select, Button, Snackbar } from "@material-ui/core"
import api from '../../../pages/api/api'
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CategoriaContext } from '../../../contexts/CategoriContext'

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


export function CreateBill() {

    const { categorias } = useContext(CategoriaContext);
    

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
                // let url: string = "http://" + window.location.host + "/conta"
                // window.location.replace(url);
            }).catch(err => {
                handleClick()
                console.log(err);
            })
    }

    const [openSlack, setOpenlack] = useState(false);

    const handleClick = () => {
        setOpenlack(true);
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenlack(false);
    };

    function handelSelectCategory(event: ChangeEvent<HTMLSelectElement>) {
        const category = event.target.value;
        setSelectedCategory(category);
    }

    return (
        <div>
            <Grid container
                spacing={2}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography align="center" variant="h3">
                        Cadastrar Conta
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid style={{ padding: 15 }}>

                        <TextField
                            id="description"
                            label="Descrição"
                            name="description"
                            onChange={handelInputChange}
                        />
                    </Grid>

                    <Grid style={{ padding: 15 }}>

                        <TextField
                            id="price"
                            label="Preço"
                            name="price"
                            type="number"
                            onChange={handelInputChange}
                        />
                    </Grid>


                    <Grid style={{ padding: 15 }}>
                        <Grid><span>Data de vencimento</span></Grid>
                        <TextField
                            id="maturityDate"
                            name="maturityDate"
                            type="date"
                            onChange={handelInputChange}
                        />
                    </Grid>


                    <Grid style={{ padding: 15 }}>
                        <Grid><span>Categoria</span></Grid>
                        <Select
                            native
                            value={selectedCategory}
                            onChange={(e: any) => handelSelectCategory(e)}
                        >
                            <option value="0">Selecione</option>
                            {
                                categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.id}> {categoria.name}</option>
                                ))
                            }
                        </Select>
                    </Grid>

                    <Grid style={{ padding: 10 }}>
                        <Button variant="contained" color="primary" type="submit">Cadastrar</Button>
                    </Grid>
                </form>
            </Grid>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={openSlack}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Erro ao cadastrar"
            />
        </div >
    );
}

