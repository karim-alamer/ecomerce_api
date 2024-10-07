const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 9000;

// MongoDB connection URL and database name, using environment variables
const urlDb = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Make sure to set MONGODB_URI in Vercel
const dbName = 'ecomerceDb';

// Middleware to parse incoming JSON data
app.use(express.json());

// Initialize MongoDB client and collection variables
let db, stockCollection;

// Connect to MongoDB
MongoClient.connect(urlDb)
  .then(client => {
    console.log('Connected successfully to MongoDB server');
    db = client.db(dbName);
    stockCollection = db.collection('stock'); // Create the stock collection

    // Start the Express server once MongoDB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// GET route to fetch all stock items from MongoDB
app.get('/api/stock', async (req, res) => {
  try {
    const stock = await stockCollection.find().toArray(); // Fetch all items from MongoDB
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to add a new product to MongoDB
app.post('/api/stock', async (req, res) => {
  const newProduct = {
    product_name: req.body.product_name,
    product_quantity: req.body.product_quantity,
    product_price: req.body.product_price,
  };

  try {
    const result = await stockCollection.insertOne(newProduct); // Insert new product into MongoDB
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT route to update a product in MongoDB
app.put('/api/stock/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await stockCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnOriginal: false }
    );

    if (!updatedProduct.value) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct.value);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE route to remove a product from MongoDB
app.delete('/api/stock/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await stockCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Product not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});
