import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Container, Typography, CircularProgress } from "@mui/material";
import TransactionTable from "../components/TransactionTable";
import TransactionForm from "../components/TransactionForm";
import { getTransactions, addTransaction } from "../services/api";

const Transactions = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  // ✅ Fetch transactions using React Query with caching
  const { data: transactions, isLoading } = useQuery("transactions", () => getTransactions(token), {
    staleTime: 60000, // Cache data for 1 minute
  });

  // ✅ Mutation to add a new transaction and refresh data
  const mutation = useMutation((newTransaction) => addTransaction(token, newTransaction), {
    onSuccess: () => {
      queryClient.invalidateQueries("transactions"); // Refresh transactions after adding
    },
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>

      {/* ✅ Transaction Form with Mutation */}
      <TransactionForm onTransactionAdded={mutation.mutate} />

      {/* ✅ Display Transactions */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TransactionTable transactions={transactions?.transactions || []} />
      )}
    </Container>
  );
};

export default Transactions;
