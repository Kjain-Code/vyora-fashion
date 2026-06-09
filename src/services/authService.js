import API from './api';

export const register = async (name, email, password, phone) => {
  const { data } = await API.post('/auth/register', { name, email, password, phone });
  localStorage.setItem('vyoraUser', JSON.stringify(data));
  return data;
};

export const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  localStorage.setItem('vyoraUser', JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem('vyoraUser');
};

export const getProfile = async () => {
  const { data } = await API.get('/auth/profile');
  return data;
};

export const updateProfile = async (userData) => {
  const { data } = await API.put('/auth/profile', userData);
  return data;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('vyoraUser') || 'null');
};