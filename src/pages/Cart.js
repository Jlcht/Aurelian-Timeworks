import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useCart } from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
        }
    };

    const subtotal = getCartTotal();
    const shipping = cartItems.length > 0 ? 0 : 0; // Free shipping
    const tax = subtotal * 0.20; // 20% VAT
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className="cart-container">
                    <div className="cart-empty">
                        <h2>Your Cart is Empty</h2>
                        <p>Add some products to get started!</p>
                        <a href="/products" className="continue-shopping-btn">Continue Shopping</a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="cart-container">
                <h1 className="cart-title">1. YOUR ORDER</h1>
                
                <div className="cart-content">
                    {/* Product List */}
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img 
                                        src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/100'}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                                        }}
                                    />
                                </div>
                                
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-description">{item.description}</p>
                                    <p className="cart-item-price">€{item.price}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="quantity-btn"
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="quantity-btn"
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-btn"
                                        aria-label="Remove item"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="cart-summary">
                        <h2>SUMMARY</h2>
                        
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                        </div>
                        
                        <div className="summary-row">
                            <span>VAT (20%)</span>
                            <span>€{tax.toFixed(2)}</span>
                        </div>
                        
                        <div className="summary-total">
                            <span>TOTAL</span>
                            <span>€{total.toFixed(2)}</span>
                        </div>

                        <div className="summary-info">
                            <p className="shipping-info">Free shipping on all orders</p>
                            <p className="return-info">Returns accepted within 30 days</p>
                        </div>

                        <button className="checkout-btn">Proceed to Checkout</button>
                        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
