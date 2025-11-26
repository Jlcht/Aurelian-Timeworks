import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './SignIn.css';

const SignIn = () => {
    return (
        <>
            <Header />
            <div className="signin-container">
                <div className="signin-card">
                    <h2>Sign In</h2>
                    <p>Welcome back! Please sign in to continue.</p>
                    {/* Your authentication logic will go here */}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignIn;