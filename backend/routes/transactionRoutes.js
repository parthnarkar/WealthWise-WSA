const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Fetch all transactions with pagination
router.get("/", authMiddleware, async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    console.log("Decoded User:", req.user); // Debugging

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const transactions = await Transaction.find({ userId: req.user.userId })
      .sort({ date: -1 }) // Sort from newest to oldest
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Transaction.countDocuments({ userId: req.user.userId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.json({ transactions, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add a new transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;

    if (!amount || isNaN(amount) || amount <= 0 || !category || !type) {
      return res.status(400).json({ message: "Valid amount, category, and type are required" });
    }

    const transaction = new Transaction({
      userId: req.user.userId,
      amount,
      category,
      type,
      date: date ? new Date(date) : new Date(),
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
});

// ✅ Update a transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { amount, category, type } = req.body;

    if (!amount || isNaN(amount) || amount <= 0 || !category || !type) {
      return res.status(400).json({ message: "Valid amount, category, and type are required" });
    }

    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    transaction.amount = amount;
    transaction.category = category;
    transaction.type = type;

    await transaction.save();
    res.json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
});

// ✅ Delete a transaction
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Transaction.deleteOne({ _id: req.params.id });

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
});

module.exports = router; // ✅ Ensure this is included!
