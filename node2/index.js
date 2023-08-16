const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongoURI = 'mongodb+srv://Aman7211:Aman9821@cluster0.f7w0oyl.mongodb.net/social?retryWrites=true&w=majority';
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

mongoDB();  // Call the function to establish the MongoDB connection

const db = mongoose.connection;

app.use(bodyParser.json());

// Mount routes
app.use(require('./routes/auth'));
app.use(require('./routes/user'));
app.use(require('./routes/post'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
