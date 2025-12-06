import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({});

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/signin', { replace: true });
        } catch (error) {
            // Optionally handle errors here
            alert('Sign out failed. Please try again.');
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            console.log("Current user: ", user);

            if (user) {
                try {
                    const userDoc = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userDoc);
                    if (docSnap.exists()) {
                        setUserProfile(docSnap.data().userProfile);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.log('No user is signed in.');
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <Header />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1>Welcome !</h1>
                    <div className="dashboard-user-info">
                        {userProfile.profileImage ? (
                            <img
                                src={userProfile.profileImage}
                                alt="Profile"
                                className="dashboard-profile-image"
                            />
                        ) : (
                            <p>No profile image available</p>
                        )}
                        <p className="dashboard-email">Signed in as: {currentUser.email}</p>
                    </div>
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