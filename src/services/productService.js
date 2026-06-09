import API from './api';

export const getProducts = async (params = {}) => {
  const { data } = await API.get('/products', { params });
  return data;
};

export const getProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

export const createReview = async (productId, review) => {
  const { data } = await API.post(`/products/${productId}/reviews`, review);
  return data;
};