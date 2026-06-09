import API from './api';

export const createOrder = async (orderData) => {
  const { data } = await API.post('/orders', orderData);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await API.get('/orders/myorders');
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await API.get(`/orders/${id}`);
  return data;
};

export const createRazorpayOrder = async (amount) => {
  const { data } = await API.post('/orders/razorpay', { amount });
  return data;
};

export const verifyPayment = async (paymentData) => {
  const { data } = await API.post('/orders/verify-payment', paymentData);
  return data;
};