const express = require('express');
const { connectDB } = require('./src/config/db');
const userRouter = require('./src/api/routes/user');
const contestRouter = require('./src/api/routes/contest');
const ticketRouter = require('./src/api/routes/ticket');
const swaggerDocs = require('./swagger/swagger');
require('dotenv').config();

const PORT = 3000;
const app = express();

connectDB();
app.use(express.json());

app.use('/user', userRouter);
app.use('/contest', contestRouter);
app.use('/ticket', ticketRouter);
swaggerDocs(app, PORT);
app.use('*', (req, res, next) => {
  const error = new Error('Route not found 🦖');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
