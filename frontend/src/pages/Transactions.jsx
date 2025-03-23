import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "@mui/material";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";
import { getTransactions } from "../services/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }
  
      const response = await getTransactions(token);
      console.log("Fetched Transactions:", response.data); // Debugging log
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error.response?.data || error.message);
    }
  };

  return (
    <Container>
      <h2>Transactions</h2>
      <TransactionForm onTransactionAdded={fetchTransactions} />
      {loading ? <p>Loading transactions...</p> : <TransactionTable transactions={transactions} />}
    </Container>
  );
};

export default Transactions;
