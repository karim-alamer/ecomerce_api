// routes/ProductRoutes.js

const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controller/productController');

const router = express.Router();

// Define routes for products
router.get('/', getProducts); // Get all products
router.post('/', createProduct); // Create a new product
router.put('/:id', updateProduct); // Update a product by ID
router.delete('/:id', deleteProduct); // Delete a product by ID

module.exports = router;
