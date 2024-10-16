import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:5000/api';

// Axios instance with base config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to set the token in Authorization header
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// API calls

// Fetch schedule bookings for a specific date
export const fetchBookings = async (date) => {
  const response = await axiosInstance.get(`/bookings?date=${date}`);
  return response.data;
};

// Get all centers (for multi-center support)
export const fetchCenters = async () => {
  const response = await axiosInstance.get('/centers');
  return response.data;
};

// Get all courts for a specific sport
export const fetchCourts = async (sportId) => {
  const response = await axiosInstance.get(`/sports/courts/${sportId}`);
  return response.data;
};

// Example authentication API calls (login/signup)
export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (credentials) => {
  const response = await axiosInstance.post('/auth/signup', credentials);
  return response.data;
};
