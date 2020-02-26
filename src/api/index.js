import axios from 'axios';

const apiRoot = axios.create({
  baseURL: 'http://localhost:1337/',
});

// Auth

export const checkAuth = (token) => {
  console.log('api', token);
  return apiRoot.post('/auth/checkAuth', null,{
    headers: {
      token: token,
    }
  })
}

export const postLogin = (body) => apiRoot.post('/auth/login', body);


// Product

export const getTestProduct = () => apiRoot.get('/test/product');

// Profile

export const getTestProfile = () => apiRoot.get('/test/user');

// Order


