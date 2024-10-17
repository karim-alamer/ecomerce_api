const express = require('express');
const dotenv = require('dotenv');
const DbConnection = require('./config/database');
const productRoutes = require('./src/routes/productRoutes');

// Load environment variables from .env file
dotenv.config({ path: 'config.env' });

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB and start the server
DbConnection(app, PORT);

// Use product routes
app.use('/', productRoutes);
