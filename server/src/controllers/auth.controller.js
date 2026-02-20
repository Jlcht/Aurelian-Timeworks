// Authentication Controller
const { auth, db } = require('../config/firebase');

/**
 * Get current user information
 * GET /api/auth/me
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const { uid } = req.user;

    // Get user data from Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      data: {
        uid,
        email: req.user.email,
        role: req.user.role,
        profile: userData.userProfile || {},
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Register new user
 * POST /api/auth/register
 * Note: User creation is handled by Firebase Auth on the client side
 * This endpoint is for additional server-side logic if needed
 */
const register = async (req, res, next) => {
  try {
    // This is handled by Firebase Auth on client + Cloud Function
    // You can add additional logic here if needed
    
    res.status(200).json({
      success: true,
      message: 'User registration is handled by Firebase Auth. Use the client SDK to register.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 * Note: Login is handled by Firebase Auth on the client side
 * This endpoint is for additional server-side logic if needed
 */
const login = async (req, res, next) => {
  try {
    // This is handled by Firebase Auth on client
    // You can add additional logic here if needed
    
    res.status(200).json({
      success: true,
      message: 'User login is handled by Firebase Auth. Use the client SDK to login.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  register,
  login,
};
