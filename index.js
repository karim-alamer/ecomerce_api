const express = require('express');
const dotenv = require('dotenv');
const DbConnection = require('./config/database');
const productRoutes = require('./src/routes/productRoutes');
const path = require('path');

dotenv.config({ path: 'config.env' });

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
DbConnection();

// Serve static files, including favicon
app.use(express.static(path.join(__dirname, 'public')));

// Use product routes
app.use('/', productRoutes);

// Favicon route
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // Send a 204 No Content response
});

// Start the Express server
module.exports = app;
