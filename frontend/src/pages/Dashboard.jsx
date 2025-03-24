import { useEffect, useState } from "react";
import { getInsights } from "../services/api";
import { Card, CardContent, Typography, CircularProgress, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// ✅ Color Palette for the Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// ✅ Framer Motion Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Dashboard = () => {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(true);
  const [spendingData, setSpendingData] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getInsights(token);

        setInsights(response.data.insights);
        
        // ✅ Extract spending categories & amounts for visualization
        if (response.data.transactions) {
          const spendingBreakdown = response.data.transactions.reduce((acc, txn) => {
            if (!acc[txn.category]) {
              acc[txn.category] = 0;
            }
            acc[txn.category] += txn.amount;
            return acc;
          }, {});

          // ✅ Format Data for Recharts
          setSpendingData(Object.keys(spendingBreakdown).map((category, index) => ({
            name: category,
            value: spendingBreakdown[category],
            color: COLORS[index % COLORS.length],
          })));
        }
      } catch (error) {
        console.error("Error fetching insights", error);
        setInsights("Unable to fetch AI insights at this time.");
      }
      setLoading(false);
    };

    fetchInsights();
  }, []);

  return (
    <motion.div initial="initial" animate="animate" variants={pageVariants}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* ✅ AI Insights Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
              <CardContent>
                <Typography variant="h6">AI-Powered Financial Insights</Typography>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Typography variant="body1">{insights}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* ✅ Spending Breakdown Pie Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: "#f5f5f5", p: 2 }}>
              <CardContent>
                <Typography variant="h6">Spending Breakdown</Typography>
                {spendingData.length === 0 ? (
                  <Typography>No transaction data available.</Typography>
                ) : (
                  <PieChart width={300} height={300}>
                    <Pie data={spendingData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Dashboard;
