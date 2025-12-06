// Import 2nd Gen Firebase Functions
const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");

// Import Firebase Admin SDK
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Import 1st Gen for auth triggers (2nd Gen auth triggers have limitations)
const functions = require("firebase-functions");

// Auth trigger using 1st Gen syntax (more reliable for auth events)
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
    try {
        // Log the new user's UID and email
        console.log(`New user created: UID=${user.uid}, Email=${user.email}`);

        // Randomly select between two profile images
        const profileImages = [
            "https://firebasestorage.googleapis.com/v0/b/backend-app-jl.firebasestorage.app/o/defaultprofilepic%2FMonkey_space_southpark_cartoon.png?alt=media&token=ab9024fb-7ee4-4032-96c4-7e098286cc7c",
            "https://firebasestorage.googleapis.com/v0/b/backend-app-jl.firebasestorage.app/o/defaultprofilepic%2FMonkey_space_onepiece.png?alt=media&token=7d89b200-6997-420e-a25e-95e1f19fddc4"
        ];
        const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];

        // Store profileImage and userEmails directly in the user's document in the 'userProfile' field
        await admin.firestore().collection("users").doc(user.uid).set({
            userProfile: {
                profileImage: randomProfileImage,
                userEmail: user.email,
            },
        }, { merge: true }); // Use merge to avoid overwriting existing fields, if any

        // If you have additional logic, add it here

    } catch (error) {
        console.error("Error handling new user creation:", error);
    }
});

// Simple HTTP function for testing
exports.helloWorld = onRequest((req, res) => {
    res.send("Hello from Firebase!");
});
