//allows to use anywhere in the app
//? makes them optional
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    type?: string;
    brand: string;
    quantityInStock?: number;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
}