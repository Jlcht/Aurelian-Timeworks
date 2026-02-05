import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../CartContext';
import './Header.css';

const Header = () => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <header className="header">
            <div className="header-left">
                {/* <img src="/logo.svg" alt="Logo" className="header-logo"/> */}
                <Link to="/" className="header-title-link">
                    <span className="header-title">Portfolio</span>
                </Link>
            </div>
            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>   

                <div className="header-icons">
                    <Link to="/wishlist" className="header-icon" aria-label="Wishlist">
                        <FontAwesomeIcon icon={faHeart} />
                    </Link>
                    <Link to="/dashboard" className="header-icon" aria-label="User Profile">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <Link to="/cart" className="header-icon cart-icon" aria-label="Shopping Cart">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;