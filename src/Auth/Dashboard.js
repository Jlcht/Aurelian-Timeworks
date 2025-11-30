import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate('/signin', { replace: true });
        } catch (error) {
            // Optionally handle errors here
            alert('Sign out failed. Please try again.');
        }
    }; 

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1>Welcome !</h1>
                    {currentUser && (
                        <p className="dashboard-email">Signed in as: {currentUser.email}</p>
                    )}
                    <button
                        className="signin-submit-btn"
                        style={{ marginTop: '2rem' }}
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;