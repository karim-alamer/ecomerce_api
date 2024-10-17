const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB using Mongoose
const urlDb = process.env.MONGODB_URI || 'mongodb+srv://ecomercedbvercer:wIQDdGizoapEHpF3@mymonogodb.ob8uw.mongodb.net/ecomercemonogodb?retryWrites=true&w=majority&appName=mymonogodb';
const DbConnection = ()=> {mongoose
  .connect(urlDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB via Mongoose');
    // Start the Express server once MongoDB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
}
module.exports = DbConnection