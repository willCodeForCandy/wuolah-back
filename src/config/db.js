const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB is up');
  } catch (error) {
    console.log('DB is down 😔', error);
  }
};

module.exports = { connectDB };
