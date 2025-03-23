import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { addTransaction } from "../services/api";
import { showToast } from "./Toast";
import CustomModal from "./Modal";

const TransactionForm = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await addTransaction(token, { amount, category, type });
      showToast("Transaction added successfully!");
      onTransactionAdded();
      setAmount("");
      setCategory("");
      setOpen(false); // Close modal after adding transaction
    } catch (error) {
      showToast("Error adding transaction", "error");
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>+ Add Transaction</Button>
      <CustomModal open={open} handleClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </CustomModal>
    </>
  );
};

export default TransactionForm;
