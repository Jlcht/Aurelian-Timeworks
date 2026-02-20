import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ProductsSidebar.css';

const ProductsSidebar = ({ filters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters);

    // Touch-drag state
    const dragStartX = useRef(null);
    const dragCurrentX = useRef(null);
    const isDragging = useRef(false);
    const sidebarRef = useRef(null);

    const SIDEBAR_WIDTH = 300;
    const DRAG_THRESHOLD = 60; // px needed to commit open/close

    const availableCategories = ['Dive', 'Dress', 'Chronograph', 'Sport', 'Field'];

    /* ── filter handlers ── */
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

    /* ── active filter count badge ── */
    const activeCount =
        localFilters.categories.length +
        (localFilters.inStock ? 1 : 0) +
        (localFilters.priceRange.min > 0 || localFilters.priceRange.max < Infinity ? 1 : 0);

    /* ── touch-drag logic ── */
    const onTouchStart = useCallback((e) => {
        dragStartX.current = e.touches[0].clientX;
        dragCurrentX.current = e.touches[0].clientX;
        isDragging.current = true;
        if (sidebarRef.current) {
            sidebarRef.current.style.transition = 'none';
        }
    }, []);

    const onTouchMove = useCallback((e) => {
        if (!isDragging.current) return;
        dragCurrentX.current = e.touches[0].clientX;
        const delta = dragCurrentX.current - dragStartX.current;

        if (sidebarRef.current) {
            if (isOpen) {
                // Dragging closed: clamp delta to [0, -SIDEBAR_WIDTH]
                const offset = Math.min(0, delta);
                sidebarRef.current.style.transform = `translateX(${offset}px)`;
            } else {
                // Only respond if starting from left edge (within 30px)
                if (dragStartX.current > 30) return;
                const offset = Math.max(0, Math.min(delta, SIDEBAR_WIDTH));
                sidebarRef.current.style.transform = `translateX(calc(-100% + ${offset}px))`;
            }
        }
    }, [isOpen]);

    const onTouchEnd = useCallback(() => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const delta = dragCurrentX.current - dragStartX.current;

        if (sidebarRef.current) {
            sidebarRef.current.style.transition = '';
            sidebarRef.current.style.transform = '';
        }

        if (isOpen) {
            if (delta < -DRAG_THRESHOLD) setIsOpen(false);
        } else {
            if (delta > DRAG_THRESHOLD && dragStartX.current <= 30) setIsOpen(true);
        }
    }, [isOpen]);

    /* ── close on Escape ── */
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, []);

    /* ── lock body scroll when open ── */
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* ── Floating toggle button ── */}
            <button
                id="sidebar-toggle-btn"
                className={`sidebar-toggle-btn ${isOpen ? 'sidebar-toggle-btn--open' : ''}`}
                onClick={() => setIsOpen(o => !o)}
                aria-label="Toggle filters"
            >
                <span className="sidebar-toggle-icon">
                    {isOpen ? '✕' : (
                        <>
                            <span className="filter-bar" />
                            <span className="filter-bar filter-bar--mid" />
                            <span className="filter-bar filter-bar--short" />
                        </>
                    )}
                </span>
                <span className="sidebar-toggle-label">
                    {isOpen ? 'Close' : 'Filters'}
                </span>
                {activeCount > 0 && !isOpen && (
                    <span className="sidebar-toggle-badge">{activeCount}</span>
                )}
            </button>

            {/* ── Backdrop ── */}
            <div
                className={`sidebar-backdrop ${isOpen ? 'sidebar-backdrop--visible' : ''}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* ── Drawer ── */}
            <aside
                ref={sidebarRef}
                id="products-sidebar"
                className={`products-sidebar ${isOpen ? 'products-sidebar--open' : ''}`}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                aria-label="Product filters"
                aria-hidden={!isOpen}
            >
                {/* Drag handle pill */}
                <div className="sidebar-drag-handle" aria-hidden="true" />

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

                {/* Apply button (mobile UX) */}
                <div className="sidebar-apply-wrap">
                    <button
                        className="sidebar-apply-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        Apply Filters{activeCount > 0 ? ` (${activeCount})` : ''}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default ProductsSidebar;
