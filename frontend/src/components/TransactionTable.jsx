import React from "react";
import { FixedSizeList } from "react-window";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const TransactionTable = ({ transactions }) => {
  const Row = ({ index, style }) => (
    <TableRow key={transactions[index]._id} style={style}>
      <TableCell>{transactions[index].category}</TableCell>
      <TableCell>${transactions[index].amount}</TableCell>
      <TableCell style={{ color: transactions[index].type === "Income" ? "green" : "red" }}>
        {transactions[index].type}
      </TableCell>
      <TableCell>{new Date(transactions[index].date).toLocaleDateString()}</TableCell>
    </TableRow>
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <FixedSizeList height={300} itemCount={transactions.length} itemSize={50} width="100%">
          {Row}
        </FixedSizeList>
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
