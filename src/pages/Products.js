import React from 'react';
import Header from '../components/Header/Header';
import ProductsSidebar from '../components/Sidebar/ProductsSidebar';
import ProductsContent from '../components/ProductsContents/ProductsContent';
import './Products.css';

const Products = () => {
    return (
        <>
            <Header/>
            <div className="products-layout">
                <ProductsSidebar/>
                <ProductsContent/>
            </div>
        </>
    );
};

export default Products;
