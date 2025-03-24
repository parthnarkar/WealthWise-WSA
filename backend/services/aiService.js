const axios = require("axios");
require("dotenv").config();

const analyzeSpending = async (transactions) => {
  try {
    // 🔹 Format transactions into a readable string for AI
    const transactionData = transactions.map(txn => 
      `Category: ${txn.category}, Amount: $${txn.amount}, Type: ${txn.type}, Date: ${txn.date.toISOString()}`
    ).join("\n");

    // 🔹 Send data to OpenAI for analysis
    const response = await axios.post("https://api.openai.com/v1/completions", {
      model: "gpt-4",
      prompt: `Analyze these financial transactions and provide insights:\n${transactionData}\nGive budget optimization advice.`,
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error("AI analysis failed:", error);
    return "Could not generate insights.";
  }
};

module.exports = { analyzeSpending };
