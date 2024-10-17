const express = require('express');
const dotenv = require('dotenv');
const DbConnection = require('./config/database');
const productRoutes = require('./routes/productRoutes');
dotenv.config({ path: 'config.env' });

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
DbConnection();

// Use product routes
app.use('/', productRoutes);

// Export the app (necessary for Vercel serverless functions)
module.exports = app;

// (Optional) Start the server locally when running in development mode
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
