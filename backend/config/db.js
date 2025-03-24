const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // 🔹 Use connection pooling for better remote DB performance
      serverSelectionTimeoutMS: 5000, // 🔹 Timeout if the DB is unreachable
    });

    console.log("✅ MongoDB Connected Successfully to Remote Cluster");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
