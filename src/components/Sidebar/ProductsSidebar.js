import React from 'react';
import './ProductsSidebar.css';

const ProductsSidebar = () => {
    return (
        <aside className="products-sidebar">
            <h3>Filters</h3>
            <ul>
                <li><a>Price</a></li>
                <li><a>Category</a></li>
                <li><a>Rating</a></li>
                <li><a>Stock</a></li>
            </ul>
        </aside>
    );
};

export default ProductsSidebar;
