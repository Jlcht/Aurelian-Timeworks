import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useWishlist } from '../WishlistContext';
import { useCart } from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Wishlist.css';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId);
    };

    return (
        <>
            <Header />
            <div className="wishlist-page">
                <div className="wishlist-container">
                    <div className="wishlist-header">
                        <div className="wishlist-title">
                            <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
                            <h1>My Wishlist</h1>
                        </div>
                        {wishlistItems.length > 0 && (
                            <button 
                                className="clear-wishlist-btn"
                                onClick={clearWishlist}
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {wishlistItems.length === 0 ? (
                        <div className="wishlist-empty">
                            <FontAwesomeIcon icon={faHeart} className="empty-icon" />
                            <h2>Your wishlist is empty</h2>
                            <p>Add products you love to your wishlist and keep track of them here!</p>
                            <button 
                                className="browse-products-btn"
                                onClick={() => navigate('/products')}
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="wishlist-count">
                                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                            </div>
                            <div className="wishlist-grid">
                                {wishlistItems.map(product => (
                                    <div key={product.id} className="wishlist-card">
                                        <button 
                                            className="remove-btn"
                                            onClick={() => handleRemoveFromWishlist(product.id)}
                                            aria-label="Remove from wishlist"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                        <div className="wishlist-image-container">
                                            <img 
                                                src={product.images && product.images[0] 
                                                    ? product.images[0] 
                                                    : 'https://via.placeholder.com/400x400?text=No+Image'
                                                } 
                                                alt={product.name}
                                                className="wishlist-image"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                                }}
                                            />
                                        </div>

                                        <div className="wishlist-info">
                                            <h3 className="wishlist-product-name">{product.name}</h3>
                                            {product.description && (
                                                <p className="wishlist-product-description">
                                                    {product.description.length > 80 
                                                        ? product.description.substring(0, 80) + '...' 
                                                        : product.description
                                                    }
                                                </p>
                                            )}
                                            <p className="wishlist-product-price">€{product.price}</p>
                                            {product.stock !== undefined && (
                                                <p className="wishlist-product-stock" style={{
                                                    color: product.stock > 0 ? '#03543f' : '#9b1c1c'
                                                }}>
                                                    {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                                                </p>
                                            )}
                                        </div>

                                        <button 
                                            className="wishlist-add-to-cart-btn"
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}
                                        >
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Wishlist;