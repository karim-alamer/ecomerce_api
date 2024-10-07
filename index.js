// const express = require('express');
// const { MongoClient } = require('mongodb');
// const app = express();
// const PORT = 9000 ||process.env.PORT;

// //connect db
// const urlDb= 'mongodb://localhost:27017';
// const dbname = 'ecomerceDb'

// app.use(express.json()); // to parse incoming JSON data


// // Sample stock data (in-memory storage for simplicity)
// let stock = [
//   { id: 1, product_name: 'Product 1', product_quantity: 50, product_price: 100 },
//   { id: 2, product_name: 'Product 2', product_quantity: 30, product_price: 200 },
// ];

// // GET route to fetch all stock items
// app.get('/api/stock', (req, res) => {
//   res.json(stock);
// });

// // POST route to add a new product
// app.post('/api/stock', (req, res) => {
//   const newProduct = {
//     id: stock.length + 1,
//     product_name: req.body.product_name,
//     product_quantity: req.body.product_quantity,
//     product_price: req.body.product_price,
//   };
//   stock.push(newProduct);
//   res.status(201).json(newProduct);
// });

// // PUT route to update a product
// app.put('/api/stock/:id', (req, res) => {
//   const { id } = req.params;
//   const product = stock.find(item => item.id === parseInt(id));
//   if (!product) return res.status(404).json({ error: 'Product not found' });

//   product.product_name = req.body.product_name;
//   product.product_quantity = req.body.product_quantity;
//   product.product_price = req.body.product_price;
//   res.json(product);
// });

// // DELETE route to remove a product
// app.delete('/api/stock/:id', (req, res) => {
//   const { id } = req.params;
//   stock = stock.filter(item => item.id !== parseInt(id));
//   res.status(204).send();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 9000;

// MongoDB connection URL and database name
const urlDb = 'mongodb://localhost:27017';
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
