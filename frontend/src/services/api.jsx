import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL (Update if deployed)

// ✅ 1️⃣ Authentication APIs
export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

// ✅ 2️⃣ Transactions APIs
export const getTransactions = async (token) => {
  return axios.get(`${API_URL}/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addTransaction = async (token, transaction) => {
  return axios.post(`${API_URL}/transactions`, transaction, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ 3️⃣ AI Insights API
export const getInsights = async (token) => {
  return axios.get(`${API_URL}/insights`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ 4️⃣ Logout Function (Clears Local Storage)
export const logout = () => {
  localStorage.removeItem("token");
};

