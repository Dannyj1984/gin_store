import { useState, useEffect } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";



export default function Catalog() {
    const [products, setProducts] =  useState<Product[]>([]); //tell ts that this array is of Products

//Empty dependancy array means code in useEffect is only ever called once.
useEffect(() => {
  fetch('https://localhost:5001/api/products')
  .then(response => response.json())
  .then(data => setProducts(data))
}, [])

    return (
        <>
            <ProductList
                products={products}
             />
        </>
    )
}