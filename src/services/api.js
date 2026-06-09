import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Auto add token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('vyoraUser') || '{}');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;