const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },  // ✅ Amount is required
  category: { 
    type: String, 
    enum: ["Food", "Transport", "Rent", "Salary", "Other"], 
    required: true 
  },  // ✅ Category is required
  type: { 
    type: String, 
    enum: ["Income", "Expense"], 
    required: true 
  },  // ✅ Type is required
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
