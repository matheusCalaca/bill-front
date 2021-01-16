import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../services/api';

interface CategoryResponse {
    id: number;
    name: string;
}


const CreateCategory = () => {

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

        await api.post('/category', JSON.stringify({'name': name}))

        alert('suceso');

    }


    return (
        <>
            <div>
                <h1>Cateogry</h1>
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