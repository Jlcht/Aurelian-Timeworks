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
    const products = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to readable JS Date
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
      };
    });
    
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
    
    // Convert Timestamps
    if (product.createdAt) product.createdAt = product.createdAt.toDate();
    if (product.updatedAt) product.updatedAt = product.updatedAt.toDate();

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
    const { name, description, price, stock, category, images } = req.body;
    const newProduct = {
      name,
      description,
      price,
      stock,
      // Use null or empty string if undefined, as Firestore doesn't accept undefined
      category: category || null, 
      images: images || [],     
      createdAt: new Date(),
    };
    const product = await db.collection('products').add(newProduct);
    
    res.status(201).json({
      success: true,
      data: {id: product.id, ...newProduct},
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
    const docRef = db.collection('products').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const updatedProduct = { updatedAt: new Date() };
    const allowedUpdates = ['name', 'description', 'price', 'stock', 'category', 'images'];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updatedProduct[field] = req.body[field];
      }
    });

    await docRef.update(updatedProduct);
    
    res.status(200).json({
      success: true,
      data: {id: req.params.id, ...updatedProduct},
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
    const docRef = db.collection('products').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const deletedProduct = await docRef.delete();
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
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
