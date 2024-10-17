// controllers/ProductController.js

const Product = require('../models/productModel');

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const stock = await Product.find(); // Fetch all products from MongoDB
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST a new product
exports.createProduct = async (req, res) => {
  const { product_name, product_quantity, product_price } = req.body;

  const newProduct = new Product({
    product_name,
    product_quantity,
    product_price
  });

  try {
    const savedProduct = await newProduct.save(); // Save the new product
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// PUT (update) a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Ensure validation is run during updates
    });

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
