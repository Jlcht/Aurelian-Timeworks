import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../CartContext';
import AurelianLogo from '../../assets/images/Aurelian_Logo-square-removebg-377.png';
import './Header.css';

const Header = () => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            <header className="header">
                {/* Left: Navigation Links */}
                <nav className="header-nav header-nav-left">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                </nav>

                {/* Center: Brand */}
                <div className="header-center">
                    <Link to="/" className="header-title-link">
                        <img src={AurelianLogo} alt="Aurelian Timeworks Logo" className="header-brand-logo" />
                        <span className="header-brand-main">Aurelian</span>
                        <span className="header-brand-sub">Timeworks</span>
                    </Link>
                </div>

                {/* Right: Icons */}
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

                    {/* Hamburger — mobile only */}
                    <button
                        className="header-hamburger"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </header>

            {/* Mobile nav drawer */}
            <div
                className={`mobile-nav-backdrop ${menuOpen ? 'mobile-nav-backdrop--visible' : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />
            <nav className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} aria-label="Mobile navigation">
                <Link to="/" className="mobile-nav-link">Home</Link>
                <Link to="/products" className="mobile-nav-link">Products</Link>
                <Link to="/about" className="mobile-nav-link">About</Link>
                <Link to="/contact" className="mobile-nav-link">Contact</Link>
                <div className="mobile-nav-icons">
                    <Link to="/wishlist" className="mobile-nav-icon-link" aria-label="Wishlist">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Wishlist</span>
                    </Link>
                    <Link to="/dashboard" className="mobile-nav-icon-link" aria-label="Account">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Account</span>
                    </Link>
                    <Link to="/cart" className="mobile-nav-icon-link" aria-label="Cart">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        <span>Cart {cartCount > 0 ? `(${cartCount})` : ''}</span>
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Header;