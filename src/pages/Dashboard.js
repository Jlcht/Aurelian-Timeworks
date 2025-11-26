import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1>Welcome !</h1>
                    {currentUser && (
                        <p className="dashboard-email">Signed in as: {currentUser.email}</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;