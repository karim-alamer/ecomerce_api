const express = require('express');
const {
    getCategories,      // Retrieve all categories
    createCategory,     // Create a new category
    getCategoryById,    // Get a single category by ID
    updateCategory,     // Update a category by ID
    deleteCategory      // Delete a category by ID
} = require('../controller/categoryController');

const router = express.Router();

// Define the routes for the category controller
router.get('/', getCategories);               // GET all categories
router.post('/', createCategory);             // POST to create a new category
router.get('/:id', getCategoryById);          // GET a single category by ID
router.put('/:id', updateCategory);           // PUT to update a category by ID
router.delete('/:id', deleteCategory);        // DELETE a category by ID

module.exports = router;
