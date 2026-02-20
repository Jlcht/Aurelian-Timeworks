import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">

                {/* ── Brand column ── */}
                <div className="footer-brand">
                    <p className="footer-brand-name">Aurelian</p>
                    <p className="footer-brand-sub">Timeworks</p>
                    <p className="footer-tagline">
                        Where precision meets trust.<br />
                        Curated luxury timepieces, authenticated and presented with care.
                    </p>
                </div>

                {/* ── Navigation columns ── */}
                <div className="footer-col">
                    <p className="footer-col-heading">Discover</p>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Collection</Link></li>
                        <li><Link to="/about">Our Maison</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="footer-col-heading">Account</p>
                    <ul>
                        <li><Link to="/signup">Sign In</Link></li>
                        <li><Link to="/dashboard">My Profile</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="footer-col-heading">Follow Us</p>
                    <ul>
                        <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                        <li><a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
                    </ul>
                    <p className="footer-col-heading" style={{marginTop: '32px'}}>Contact</p>
                    <a href="mailto:contact@aureliantimeworks.com" className="footer-email">
                        contact@aureliantimeworks.com
                    </a>
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="footer-bottom">
                <p>© 2025 Aurelian Timeworks. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
