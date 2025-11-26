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
                <Link to="/docs">Docs</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/signin" className="header-signin-button">Sign In</Link>
            </nav>
        </header>
    );
};

export default Header;