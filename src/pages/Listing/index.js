import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Product from "../../components/product";
import './index.css';

const Listing = ({ categories, data }) => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    let category = categories.find(category => category.id === parseInt(id));
    useEffect(() => {
        category = categories.find(category => category.id === parseInt(id));
        if (category) {
            const productsFilter = data.filter(item => item.categoryId === category.id);
            setProducts(productsFilter);
        }
    }, [id, categories, data]);

    return (
        <div className="container-a">
            <h1 className="text-2xl">Products in category {category?.name} </h1>
            <div className="grid">
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <Product item={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listing;
