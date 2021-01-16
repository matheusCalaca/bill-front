import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '../services/api';

interface CategoryResponse {
    id: number;
    name: string;
}


const CreateCategory = () => {

    const [categorias, setCategorias] = useState<CategoryResponse[]>([])


    useEffect(() => {
       getListCategori()
    }, []);

function getListCategori(){
    api.get('/category/all').then(response => {
        setCategorias(response.data);
    })
}


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

        await api.post('/category', JSON.stringify({ 'name': name }))

        getListCategori()

    }

    async function handleDelet(id: number) {
        await api.delete(`/category/${id}`)
        getListCategori()
    }


    return (
        <>
            <div>
                <h1>Cateogry</h1>
                <div>
                    <ul>
                        {categorias.map(categoria => (<li key={categoria.id}>{categoria.name} <button onClick={(e) => handleDelet(categoria.id)}>X</button></li>))}
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br></br> Categoria</h1>
                    <div className="field">
                        <label htmlFor="name">
                            Categoria
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handelInputChange}
                        />
                    </div>
                    <button type="submit">Cadastrar Catgoria</button>
                </form>
            </div>
        </>
    )
};

export default CreateCategory;