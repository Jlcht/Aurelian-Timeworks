// Products Controller
const { db } = require('../config/firebase');
const { validationResult } = require('express-validator');

/**
 * Get all products
 * GET /api/products
 * 
 * TODO: Implement this function
 * - Fetch all products from Firestore 'products' collection
 * - Support pagination (optional)
 * - Support filtering by category (optional)
 * - Return array of products
 */
const getAllProducts = async (req, res, next) => {
  try {
    // Fetch all products from Firestore
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    res.json({ 
      success: true, 
      count: products.length, 
      data: products 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by ID
 * GET /api/products/:id
 * 
 * TODO: Implement this function
 * - Get product ID from req.params.id
 * - Fetch product from Firestore
 * - Return product data or 404 if not found
 */
const getProductById = async (req, res, next) => {
  try {
    // TODO: Your code here
    // Hint: Use db.collection('products').doc(req.params.id).get()
    const snapshot = await db.collection('products').doc(req.params.id).get();
    const product = snapshot.data();
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    
    res.json({
      success: true,
      data: {id: req.params.id, ...product},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new product
 * POST /api/products
 * 
 * TODO: Implement this function
 * - Validate input data (name, description, price, stock)
 * - Create new product in Firestore
 * - Return created product with ID
 * 
 * Required fields:
 * - name: string
 * - description: string
 * - price: number (> 0)
 * - stock: number (>= 0)
 * - category: string (optional)
 * - images: array of URLs (optional)
 */
const createProduct = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // TODO: Your code here
    // Hint: Use db.collection('products').add({ ...productData, createdAt: new Date() })
    
    res.status(501).json({
      success: false,
      error: 'Not implemented yet. This is for you to build!',
      hint: 'Use db.collection("products").add() to create a product',
      expectedBody: {
        name: 'Product Name',
        description: 'Product Description',
        price: 29.99,
        stock: 100,
        category: 'electronics',
        images: ['url1', 'url2'],
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing product
 * PUT /api/products/:id
 * 
 * TODO: Implement this function
 * - Get product ID from req.params.id
 * - Validate input data
 * - Update product in Firestore
 * - Return updated product
 */
const updateProduct = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // TODO: Your code here
    // Hint: Use db.collection('products').doc(id).update({ ...updates, updatedAt: new Date() })
    
    res.status(501).json({
      success: false,
      error: 'Not implemented yet. This is for you to build!',
      hint: 'Use db.collection("products").doc(id).update() to update a product',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 * DELETE /api/products/:id
 * 
 * TODO: Implement this function
 * - Get product ID from req.params.id
 * - Check if product exists
 * - Delete product from Firestore
 * - Return success message
 */
const deleteProduct = async (req, res, next) => {
  try {
    // TODO: Your code here
    // Hint: Use db.collection('products').doc(id).delete()
    
    res.status(501).json({
      success: false,
      error: 'Not implemented yet. This is for you to build!',
      hint: 'Use db.collection("products").doc(id).delete() to delete a product',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
