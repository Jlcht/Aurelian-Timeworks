import React, { useState, useEffect } from 'react';
import './ProductsContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useCart } from '../../CartContext';

const ProductsContent = ({ filters }) => {
    const [favorites, setFavorites] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [addedToCart, setAddedToCart] = useState({});
    
    const { addToCart } = useCart();

    const API_URL = 'http://localhost:5000/api/products';

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                
                if (data.success) {
                    setProducts(data.data);
                } else {
                    setError('Failed to load products');
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on filters
    const filteredProducts = products.filter(product => {
        // Category filter
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
            return false;
        }

        // Price filter
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
            return false;
        }

        // Stock filter
        if (filters.inStock && product.stock <= 0) {
            return false;
        }

        return true;
    });

    const toggleFavorite = (productId) => {
        setFavorites(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        
        // Show feedback
        setAddedToCart(prev => ({ ...prev, [product.id]: true }));
        
        // Remove feedback after 2 seconds
        setTimeout(() => {
            setAddedToCart(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
    };

    return (
        <div className="products-content">
            <div className="products-header">
                <h2>Products</h2>
            </div>

            {loading && (
                <div className="products-loading">
                    <p>Loading products...</p>
                </div>
            )}

            {error && (
                <div className="products-error">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="products-empty">
                    <p>No products available at the moment.</p>
                </div>
            )}

            {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
                <div className="products-empty">
                    <p>No products match your filters.</p>
                    <p style={{ fontSize: '0.9rem', color: '#95a5a6', marginTop: '10px' }}>
                        Try adjusting your filter criteria.
                    </p>
                </div>
            )}

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div 
                        key={product.id} 
                        className="product-card"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        {product.category && (
                            <div className="product-badge">{product.category}</div>
                        )}
                        
                        <button 
                            className={`product-favorite ${favorites[product.id] ? 'active' : ''}`}
                            onClick={() => toggleFavorite(product.id)}
                            aria-label="Add to favorites"
                        >
                            <FontAwesomeIcon 
                                icon={favorites[product.id] ? faHeartSolid : faHeartRegular} 
                            />
                        </button>

                        <div className="product-image-container">
                            {/* Image indicator dots - only show if multiple images */}
                            {product.images && product.images.length > 1 && (
                                <div className="image-indicator">
                                    <span className={hoveredProduct !== product.id ? 'active' : ''}></span>
                                    <span className={hoveredProduct === product.id ? 'active' : ''}></span>
                                </div>
                            )}
                            
                            <img 
                                src={
                                    hoveredProduct === product.id && product.images && product.images[1]
                                        ? product.images[1]
                                        : product.images && product.images[0] 
                                            ? product.images[0] 
                                            : 'https://via.placeholder.com/400x400?text=No+Image'
                                } 
                                alt={product.name}
                                className="product-image"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                }}
                            />
                        </div>

                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">€{product.price}</p>
                            {product.stock !== undefined && (
                                <p className="product-stock" style={{
                                    fontSize: '0.85rem',
                                    color: product.stock > 0 ? '#03543f' : '#9b1c1c',
                                    marginTop: '0.5rem'
                                }}>
                                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                </p>
                            )}
                        </div>

                        <button 
                            className={`product-cta ${addedToCart[product.id] ? 'added' : ''}`}
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                        >
                            {addedToCart[product.id] ? '✓ Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsContent;
