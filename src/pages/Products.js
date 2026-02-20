import React, { useState } from 'react';
import Header from '../components/Header/Header';
import ProductsSidebar from '../components/Sidebar/ProductsSidebar';
import ProductsContent from '../components/ProductsContents/ProductsContent';
import Footer from '../components/Footer/Footer';
import './Products.css';

const Products = () => {
    const [filters, setFilters] = useState({
        categories: [],
        priceRange: { min: 0, max: Infinity },
        inStock: false
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <Header />
            {/* Sidebar renders its own fixed drawer + toggle button */}
            <ProductsSidebar filters={filters} onFilterChange={handleFilterChange} />
            <div className="products-layout">
                <ProductsContent filters={filters} />
            </div>
            <Footer />
        </>
    );
};

export default Products;
