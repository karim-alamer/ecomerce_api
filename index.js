// require('dotenv').config();  
// const express = require('express');

// // dotenv.config(path:'con')
// const app = express();
// const PORT = process.env.PORT || 9000;

// // MongoDB connection URL, using environment variables
//  // Make sure to set MONGODB_URI in Vercel

// // Middleware to parse incoming JSON data
// app.use(express.json());

// // Define a schema and model for products (stock)
// const productSchema = new mongoose.Schema({
//   product_name: { type: String, required: true },
//   product_quantity: { type: Number, required: true },
//   product_price: { type: Number, required: true }
// });

// const Product = mongoose.model('Product', productSchema);

// // Connect to MongoDB using Mongoose
// mongoose
//   .connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected successfully to MongoDB via Mongoose');
//     // Start the Express server once MongoDB is connected
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//   });

// // GET route to fetch all products from MongoDB
// app.get('/api/stock', async (req, res) => {
//   try {
//     const stock = await Product.find(); // Fetch all products from MongoDB
//     res.json(stock);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // POST route to add a new product to MongoDB
// app.post('/api/stock', async (req, res) => {
//   const { product_name, product_quantity, product_price } = req.body;

//   const newProduct = new Product({
//     product_name,
//     product_quantity,
//     product_price
//   });

//   try {
//     const savedProduct = await newProduct.save(); // Save the new product
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add product' });
//   }
// });

// // PUT route to update a product in MongoDB
// app.put('/api/stock/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true // Ensure validation is run during updates
//     });

//     if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update product' });
//   }
// });

// // DELETE route to remove a product from MongoDB
// app.delete('/api/stock/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(id);

//     if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete product' });
//   }
// });



const express = require('express');
const dotenv = require('dotenv');
const DbConnection = require('./config/database');
const productRoutes = require('./routes/productRoutes');
dotenv.config({path:'config.env'});

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
DbConnection();

// Use product routes
app.use('/', productRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

