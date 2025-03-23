import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getTransactions = async (token) => {
    if (!token) {
      console.error("No token found in localStorage");
      return { data: [] }; // Prevent API call if no token exists
    }
    
    try {
      return await axios.get(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error fetching transactions:", error.response?.data || error.message);
      throw error;
    }
  };

export const addTransaction = async (token, transaction) => {
  return axios.post(`${API_URL}/transactions`, transaction, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
