import { createContext, useState, ReactNode } from 'react';
import api from '../pages/api/api'


interface CategoryResponse {
    id: number;
    name: string;
}

interface CategoriasContextData {
    categorias: CategoryResponse[];
    reloadCategorias: () => void;
}

interface CategoriaProviderProps {
    children: ReactNode;
    categorias: CategoryResponse[];
}

export const CategoriaContext = createContext({} as CategoriasContextData);

export function CategoriaProvider({
    children,
    ...rest
}: CategoriaProviderProps) {


    const [categorias, setCategorias] = useState<CategoryResponse[]>(rest.categorias ?? [])

    function reloadCategorias() {
        api.get('/category/all').then(response => {
            setCategorias(response.data);
        })
    }


    return (
        <CategoriaContext.Provider
            value={{
                categorias,
            }}
        >
            {children}

        </CategoriaContext.Provider>
    );
}

