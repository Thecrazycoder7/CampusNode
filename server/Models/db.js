const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGO_URI;
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
    process.exit(1); // optional: stop app on DB fail
  }
};


module.exports = connectDB;
