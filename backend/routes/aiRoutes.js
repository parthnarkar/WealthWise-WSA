const express = require("express");
const { analyzeSpending } = require("../services/aiService");
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

const router = express.Router();

// ✅ AI-Powered Financial Insights API
router.get("/insights", authMiddleware, async (req, res) => {
  try {
    // 🔹 Fetch user transactions from MongoDB
    const transactions = await Transaction.find({ userId: req.user.userId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for analysis." });
    }

    // 🔹 Send transactions to AI for analysis
    const insights = await analyzeSpending(transactions);

    res.json({ insights });
  } catch (error) {
    console.error("Error generating AI insights:", error);
    res.status(500).json({ message: "AI analysis failed.", error: error.message });
  }
});

module.exports = router;
