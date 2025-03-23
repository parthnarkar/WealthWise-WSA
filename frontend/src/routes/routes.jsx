import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Transactions from "../pages/Transactions.jsx";  // ✅ Ensure this import is correct

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />  {/* ✅ Add Transactions Route */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
