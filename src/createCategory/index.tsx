import React, { useEffect, useState } from 'react';
import axios from 'axios'


interface CategoryResponse {
    id: Number;
    name: string;
}


const CreateCategory = () => {
    const [items, setItems] = useState<CategoryResponse[]>([])

    useEffect(() => {
        axios.get<CategoryResponse[]>('http://localhost:8080/category/all').then(response => {
            console.log(response.data);

            setItems(response.data);
        })
    }, []);

    return (
        <>
            <h1>Create Category</h1>
            <div>
                <ul>
                    {items.map(test => <li>{test.name}</li>)}
                </ul>
            </div>
        </>
    )
};

export default CreateCategory;