import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";



export default function Catalog() {
    const [products, setProducts] =  useState<Product[]>([]); //tell ts that this array is of Products
    const [loading, setLoading] = useState(true)
//Empty dependancy array means code in useEffect is only ever called once.
useEffect(() => {
   agent.Catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
}, [])

if(loading) {
    return <LoadingComponent message = 'Loading Members' />
}

    return (
        <>
            <ProductList
                products={products}
             />
        </>
    )
}