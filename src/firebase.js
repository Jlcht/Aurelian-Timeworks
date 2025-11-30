// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, sendSignInLinkToEmail, connectAuthEmulator } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app);
const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, "http://localhost:9099");
  }

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();




// Export everything
export { app, firestore, auth, googleProvider, sendSignInLinkToEmail };