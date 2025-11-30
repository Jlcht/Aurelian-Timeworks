import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
    onAuthStateChanged,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink
} from 'firebase/auth';

const actionCodeSettings = {
    // Update to match your deployment:
    url: `${window.location.origin}/signin`,
    handleCodeInApp: true,
};

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [infoMsg, setInfoMsg] = useState('');

    // Redirect to dashboard if already signed in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard', { replace: true });
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Handle passwordless email link sign-in (on return from link in email)
    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            // Try to get email from localStorage, prompt if not available
            let storedEmail = window.localStorage.getItem('emailForSignIn');
            if (!storedEmail) {
                storedEmail = window.prompt('Please provide your email for confirmation');
            }
            if (storedEmail) {
                signInWithEmailLink(auth, storedEmail, window.location.href)
                    .then(() => {
                        window.localStorage.removeItem('emailForSignIn');
                        // navigation will be handled in onAuthStateChanged
                    })
                    .catch((error) => {
                        setErrorMsg(error.message || 'Email link sign-in failed.');
                    });
            }
        }
    }, [navigate]);

    const handlePasswordlessSignIn = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setInfoMsg('');
        if (!email) {
            setErrorMsg('Please enter your email address.');
            return;
        }

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            setInfoMsg('A sign-in link has been sent to your email. Please check your inbox.');
        } catch (error) {
            setErrorMsg(error.message || 'Failed to send sign-in link.');
        }
    };

    const handleGoogleSignIn = async () => {
        setErrorMsg('');
        setInfoMsg('');
        try {
            const { signInWithRedirect } = await import('firebase/auth');
            await signInWithRedirect(auth, googleProvider);
            // onAuthStateChanged will handle the redirect after auth
        } catch (error) {
            console.error('Google sign-in error:', error);
            setErrorMsg('Google sign-in failed. Try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="signin-container">
                <div className="signin-card">
                    <h2>Sign In</h2>
                    <p>Welcome! Sign in using either email or Google.</p>
                    <form className="signin-form" onSubmit={handlePasswordlessSignIn}>
                        <div className="form-group">
                            <label htmlFor="email" className="signin-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="signin-input"
                                autoComplete="email"
                            />
                        </div>
                        {errorMsg && <div className="signin-error">{errorMsg}</div>}
                        {infoMsg && <div className="signin-info">{infoMsg}</div>}
                        <button type="submit" className="signin-submit-btn">
                            Send Sign-In Link
                        </button>
                    </form>
                    <div className="signin-or">or</div>
                    <div className="signin-social">
                        <button
                            type="button"
                            className="signin-google-btn"
                            onClick={handleGoogleSignIn}
                        >
                            <span className="signin-google-icon">
                                <FontAwesomeIcon icon={faGoogle} />
                            </span>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignIn;
                        