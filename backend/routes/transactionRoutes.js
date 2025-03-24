const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");
const redis = require("redis");

// ✅ Initialize Redis Client
const client = redis.createClient();
client.connect().catch(console.error);

// ✅ Fetch all transactions with pagination & Redis caching
router.get("/", authMiddleware, async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const cacheKey = `transactions:${req.user.userId}:page-${page}:limit-${limit}`;

    console.log("Decoded User:", req.user); // Debugging

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // ✅ Check Redis Cache Before Querying Database
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log("Serving from Cache");
      return res.json(JSON.parse(cachedData));
    }

    // ✅ Fetch from Database if Cache Misses
    const transactions = await Transaction.find({ userId: req.user.userId })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Transaction.countDocuments({ userId: req.user.userId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    // ✅ Store Transactions in Redis (Cache for 1 Hour)
    await client.setEx(cacheKey, 3600, JSON.stringify({ transactions, totalPages: Math.ceil(total / limit) }));

    res.json({ transactions, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Add a new transaction & Clear Cache
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

    // ✅ Clear Cache for this User (Ensure Fresh Data)
    await client.del(`transactions:${req.user.userId}:page-1:limit-10`);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error: error.message });
  }
});

// ✅ Update a transaction & Clear Cache
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

    // ✅ Clear Cache for this User
    await client.del(`transactions:${req.user.userId}:page-1:limit-10`);

    res.json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
});

// ✅ Delete a transaction & Clear Cache
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Transaction.deleteOne({ _id: req.params.id });

    // ✅ Clear Cache for this User
    await client.del(`transactions:${req.user.userId}:page-1:limit-10`);

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
});

module.exports = router; // ✅ Ensure this is included!
