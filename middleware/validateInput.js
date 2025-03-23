module.exports = (req, res, next) => {
    const { amount, category, type, date } = req.body;
  
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than zero" });
    }
  
    const validCategories = ["Food", "Transport", "Rent", "Salary", "Other"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }
  
    if (type !== "Income" && type !== "Expense") {
      return res.status(400).json({ message: "Type must be Income or Expense" });
    }
  
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
  
    next();
  };
  