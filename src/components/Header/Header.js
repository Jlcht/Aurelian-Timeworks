import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
                <Link to="/contact">Contact</Link>
                <Link to="/signup" className="header-signin-button">Sign Up</Link>
            </nav>
        </header>
    );
};

export default Header;