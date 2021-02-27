import { Grid, Typography, TextField, Select, Button, Snackbar } from "@material-ui/core"
import api from '../../pages/api/api'
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CategoriaContext } from '../../contexts/CategoriContext'

interface CategoryResponse {
    id: number;
    name: string;
}


export function CreateCategory() {


    const { reloadCategorias } = useContext(CategoriaContext);
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

    const [formData, setFormData] = useState({
        name: '',
    });

    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData({
            ...formData, [name]: value
        })
    }


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name } = formData;

        await api.post('/category', JSON.stringify({ 'name': name })).then(response => {
            // let url: string = "http://" + window.location.host + "/categoria"
            // window.location.replace(url);
            reloadCategorias;
        }).catch(err => {
            handleClick()
            console.log(err);
        })

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
                        Cadastro de Categoria
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid >
                        <Grid style={{ padding: 15 }}>

                            <TextField
                                id="name"
                                label="Categoria"
                                name="name"
                                onChange={handelInputChange}
                            />
                        </Grid>
                        <Grid style={{ padding: 10 }}>
                            <Button variant="contained" color="primary" type="submit">Cadastrar Categoria</Button>
                        </Grid>
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

