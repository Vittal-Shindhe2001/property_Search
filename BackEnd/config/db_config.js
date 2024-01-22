const mongoose = require('mongoose');

const db_config = async () => {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/Property_Search');
    console.log('Connected to the database successfully');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = db_config;
