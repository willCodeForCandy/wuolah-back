const express = require('express');
const { connectDB } = require('./src/config/db');
require('dotenv').config();

const PORT = 3000;
const app = express();

connectDB();
app.use(express.json());

app.use('*', (req, res, next) => {
  const error = new Error('Route not found 🦖');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

app.listen(PORT, (req, res, next) => {
  console.log(`Listening on http://localhost:${PORT}`);
});
