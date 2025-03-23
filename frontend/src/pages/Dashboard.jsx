import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Container, Grid } from "@mui/material";

const Dashboard = () => {
  return (
    <Container>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <h2>Welcome to Your AI Accountant Dashboard</h2>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
