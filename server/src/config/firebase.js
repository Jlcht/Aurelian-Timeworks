// Firebase Admin SDK Configuration
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'backend-app-jl',
  });
}

// Get Firestore instance
const db = admin.firestore();
const auth = admin.auth();

// Connect to emulators in development
if (process.env.USE_EMULATORS === 'true') {
  console.log('🔧 Using Firebase Emulators');
  
  // Set emulator hosts
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
  
  console.log('✅ Firestore Emulator: localhost:8080');
  console.log('✅ Auth Emulator: localhost:9099');
  console.log('✅ Storage Emulator: localhost:9199');
}

module.exports = {
  admin,
  db,
  auth,
};
