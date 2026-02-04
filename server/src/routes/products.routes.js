// Products Routes
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');
const { authenticate, requireAdmin } = require('../middleware/auth');

/**
 * Validation rules for product creation/update
 */
const productValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10 })
    .withMessage('Product description must be at least 10 characters'),
  
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
  
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty if provided'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of URLs'),
];

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Private (Admin only)
 */
router.post('/', authenticate, requireAdmin, productValidation, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update existing product
 * @access  Private (Admin only)
 */
router.put('/:id', authenticate, requireAdmin, productValidation, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticate, requireAdmin, deleteProduct);

module.exports = router;
