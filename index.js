const express = require('express');
const app = express();
const PORT = 9000;

app.use(express.json()); // to parse incoming JSON data

// Sample stock data (in-memory storage for simplicity)
let stock = [
  { id: 1, product_name: 'Product 1', product_quantity: 50, product_price: 100 },
  { id: 2, product_name: 'Product 2', product_quantity: 30, product_price: 200 },
];

// GET route to fetch all stock items
app.get('/api/stock', (req, res) => {
  res.json(stock);
});

// POST route to add a new product
app.post('/api/stock', (req, res) => {
  const newProduct = {
    id: stock.length + 1,
    product_name: req.body.product_name,
    product_quantity: req.body.product_quantity,
    product_price: req.body.product_price,
  };
  stock.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT route to update a product
app.put('/api/stock/:id', (req, res) => {
  const { id } = req.params;
  const product = stock.find(item => item.id === parseInt(id));
  if (!product) return res.status(404).json({ error: 'Product not found' });

  product.product_name = req.body.product_name;
  product.product_quantity = req.body.product_quantity;
  product.product_price = req.body.product_price;
  res.json(product);
});

// DELETE route to remove a product
app.delete('/api/stock/:id', (req, res) => {
  const { id } = req.params;
  stock = stock.filter(item => item.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
