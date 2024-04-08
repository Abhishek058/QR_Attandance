const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Attandance");

    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
