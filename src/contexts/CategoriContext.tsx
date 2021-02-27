import { createContext, useState, ReactNode } from 'react';


interface CategoryResponse {
    id: number;
    name: string;
}

interface CategoriasContextData {
    categorias: CategoryResponse[];
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

