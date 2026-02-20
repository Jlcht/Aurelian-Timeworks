// Express.js Server Entry Point
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// ===== MIDDLEWARE =====

// CORS configuration (allow React frontend)
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ===== ROUTES =====

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'E-Shop Backend API is running! 🚀',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

// ===== ERROR HANDLING =====

// 404 handler (must be after all routes)
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// ===== START SERVER =====

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ===================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ===================================');
  console.log('');
  console.log('📍 API Endpoints:');
  console.log(`   - Health Check: http://localhost:${PORT}/`);
  console.log(`   - Auth API:     http://localhost:${PORT}/api/auth`);
  console.log(`   - Products API: http://localhost:${PORT}/api/products`);
  console.log('');
  console.log('🔧 Firebase Emulators:');
  console.log('   - Auth:      localhost:9099');
  console.log('   - Firestore: localhost:8080');
  console.log('   - Storage:   localhost:9199');
  console.log('');
  console.log('✅ Ready to accept requests!');
  console.log('');
});

module.exports = app;
