import React, { useState } from 'react';
import './ProductsContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const ProductsContent = () => {
    const [favorites, setFavorites] = useState({});

    // Sample product data
    const products = [
        {
            id: 1,
            badge: 'Bracelet interchangeable',
            name: 'Montre Piaget Polo Date',
            description: 'Montre Acier Automatique',
            price: '13 400 €',
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop'
        },
        {
            id: 2,
            badge: 'Essentiel',
            name: 'Montre Piaget Polo Field',
            description: 'Montre Acier Automatique',
            price: '13 400 €',
            image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop'
        },
        {
            id: 3,
            badge: null,
            name: 'Montre Chronographe Piaget Polo',
            description: 'Montre Chronographe Acier Automatique',
            price: '21 200 €',
            image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop'
        },
        {
            id: 4,
            badge: 'New Arrival',
            name: 'Montre Piaget Altiplano',
            description: 'Montre Or Rose Automatique',
            price: '18 900 €',
            image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop'
        },
        {
            id: 5,
            badge: 'Limited Edition',
            name: 'Montre Piaget Possession',
            description: 'Montre Diamants Quartz',
            price: '24 500 €',
            image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop'
        },
        {
            id: 6,
            badge: 'Best Seller',
            name: 'Montre Piaget Limelight',
            description: 'Montre Or Blanc Automatique',
            price: '19 800 €',
            image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop'
        }
    ];

    const toggleFavorite = (productId) => {
        setFavorites(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    return (
        <div className="products-content">
            <div className="products-header">
                <h2>Our Collection</h2>
                <p className="products-subtitle">Discover our exquisite timepieces</p>
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        {product.badge && (
                            <div className="product-badge">{product.badge}</div>
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
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="product-image"
                            />
                        </div>

                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price}</p>
                        </div>

                        <button className="product-cta">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsContent;
