const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");  // ✅ Ensure this is correctly imported
const transactionRoutes = require("./routes/transactionRoutes"); 
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();
connectDB();

console.log("Transaction Routes:", transactionRoutes);

const app = express();
app.use(express.json()); // ✅ Ensure JSON parsing middleware is included
app.use(cors());

app.get("/", (req, res) => res.send("API is running..."));

// Use Routes
app.use("/api/auth", authRoutes); // ✅ Ensure this is used
app.use("/api/transactions", transactionRoutes);
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
