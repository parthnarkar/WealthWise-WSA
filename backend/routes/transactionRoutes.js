const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

// Fetch all transactions
router.get("/", authMiddleware, async (req, res) => {
    try {
      console.log("Decoded User:", req.user); // Debugging
  
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
      }
  
      const transactions = await Transaction.find({ userId: req.user.userId }).sort({ date: -1 });
  
      if (!transactions) {
        return res.status(404).json({ message: "No transactions found" });
      }
  
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
// Add a new transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, category, type, date } = req.body;

    if (!amount || !category || !type) {
        return res.status(400).json({ message: "All fields (amount, category, type) are required" });
      }
  
    const transaction = new Transaction({
      userId: req.user.userId,
      amount,
      category,
      type,
      date,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { amount, category, type } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    transaction.amount = amount;
    transaction.category = category;
    transaction.type = type;

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) return res.status(404).json({ message: "Transaction not found" });
  
      if (transaction.userId.toString() !== req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Use deleteOne instead of remove()
      await Transaction.deleteOne({ _id: req.params.id });
  
      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;  // ✅ Ensure this is included at the end!
