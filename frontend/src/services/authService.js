import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Signup API call
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

// Login API call
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};
