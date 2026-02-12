import React, { useState, useEffect } from 'react';
import './ProductsSidebar.css';

const ProductsSidebar = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Available categories (you can fetch these from backend later)
    const availableCategories = ['clothing', 'electronics', 'accessories', 'home', 'sports'];

    const handleCategoryToggle = (category) => {
        const newCategories = localFilters.categories.includes(category)
            ? localFilters.categories.filter(c => c !== category)
            : [...localFilters.categories, category];
        
        const newFilters = { ...localFilters, categories: newCategories };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handlePriceChange = (type, value) => {
        const newPriceRange = { 
            ...localFilters.priceRange, 
            [type]: value === '' ? (type === 'min' ? 0 : Infinity) : Number(value)
        };
        const newFilters = { ...localFilters, priceRange: newPriceRange };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleStockToggle = () => {
        const newFilters = { ...localFilters, inStock: !localFilters.inStock };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleClearFilters = () => {
        const clearedFilters = {
            categories: [],
            priceRange: { min: 0, max: Infinity },
            inStock: false
        };
        setLocalFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    return (
        <aside className="products-sidebar">
            <div className="sidebar-header">
                <h3>Filters</h3>
                <button onClick={handleClearFilters} className="clear-filters-btn">
                    Clear All
                </button>
            </div>

            {/* Category Filter */}
            <div className="filter-section">
                <h4>Category</h4>
                <div className="filter-options">
                    {availableCategories.map(category => (
                        <label key={category} className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={localFilters.categories.includes(category)}
                                onChange={() => handleCategoryToggle(category)}
                            />
                            <span className="checkbox-label">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={localFilters.priceRange.min === 0 ? '' : localFilters.priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="price-input"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={localFilters.priceRange.max === Infinity ? '' : localFilters.priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="price-input"
                    />
                </div>
            </div>

            {/* Stock Filter */}
            <div className="filter-section">
                <h4>Availability</h4>
                <label className="filter-checkbox">
                    <input
                        type="checkbox"
                        checked={localFilters.inStock}
                        onChange={handleStockToggle}
                    />
                    <span className="checkbox-label">In Stock Only</span>
                </label>
            </div>
        </aside>
    );
};

export default ProductsSidebar;
