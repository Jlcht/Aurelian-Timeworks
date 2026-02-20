// Authentication Middleware
const { auth, db } = require('../config/firebase');

/**
 * Middleware to verify Firebase ID token
 * Attaches user info to req.user if valid
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided. Please include Authorization header with Bearer token.',
      });
    }

    // Extract token
    const token = authHeader.split('Bearer ')[1];

    // Verify token with Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    
    // Fetch user role from Firestore
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();
    const userRole = userData ? userData.role : 'customer';

    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userRole, 
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token. Please login again.',
    });
  }
};

/**
 * Middleware to check if user is admin
 * Must be used after authenticate middleware
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required.',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin access required. You do not have permission to perform this action.',
    });
  }

  next();
};

module.exports = {
  authenticate,
  requireAdmin,
};
