// models/ProductModel.js

const mongoose = require('mongoose');

// Define a schema for products (stock)
const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_quantity: { type: Number, required: true },
  product_price: { type: Number, required: true }
});

// Create a model for products
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
