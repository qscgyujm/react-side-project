import axios from 'axios';

const apiRoot = axios.create({
  baseURL: 'http://localhost:1337/',
});

// Auth

export const checkAuth = (token) => {
  console.log('api', token);
  return apiRoot.post('/auth/checkAuth', null, {
    headers: {
      token: token,
    }
  })
}

export const postLogin = (body) => apiRoot.post('/auth/login', body);

// Product

export const getTestProduct = () => apiRoot.get('/test/product');
export const getProductList = (token) => {
  console.log('API token', token);
  return apiRoot.get('/product/all', {
    headers: {
      Authorization: token,
    }
  });
}
export const createProduct = (product) => apiRoot.post('/product', product);
export const updateProduct = ({id, product, token}) => apiRoot.put(`/product/${id}`, product, {
  headers: {
    Authorization: token,
  }
});

// Profile

export const getTestProfile = () => apiRoot.get('/test/user');
export const getProfile = () => apiRoot.get('/user');
export const updateProfile = () => apiRoot.post('/user');

// Order

export const getOrderList = () => apiRoot.get('/order');
export const updateOrder = (orderId) => apiRoot.get(`/order/${orderId}`);

