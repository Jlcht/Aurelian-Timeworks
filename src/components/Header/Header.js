import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                {/* <img src="/logo.svg" alt="Logo" className="header-logo"/> */}
                <span className="header-title">Portfolio</span>
            </div>
            <nav className="header-nav">
                <a href="/">Home</a>
                <a href="/docs">Docs</a>
                <a href="/contact">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
