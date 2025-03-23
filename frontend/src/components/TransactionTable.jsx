import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";

const TransactionTable = ({ transactions }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Amount</b></TableCell>
            <TableCell><b>Type</b></TableCell>
            <TableCell><b>Date</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn._id} hover>
              <TableCell>{txn.category}</TableCell>
              <TableCell>${txn.amount}</TableCell>
              <TableCell sx={{ color: txn.type === "Income" ? "green" : "red" }}>
                {txn.type}
              </TableCell>
              <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
