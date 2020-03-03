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
export const createProduct = ({body, token}) => {
  console.log('api', {body, token});
  return apiRoot.post('/product/create', body, {
    headers: {
      Authorization: token,
    }
  });
}

export const updateProduct = ({id, body, token}) => {
  console.log('api', {id, body, token});

  return apiRoot.put(`/product/${id}`, body, {
    headers: {
      Authorization: token,
    }
  });
}

// Profile

export const getProfile = (token) => {
  return apiRoot.get('/user', {
    headers: {
      Authorization: token,
    }
  });
}
export const updateProfile = ({profile, token}) => {
  // console.log(profile, token);
  return apiRoot.put('/user/profile', profile, {
    headers: {
      Authorization: token,
    }
  });
}

export const updateProfilePassword = ({passwordObj, token}) => {
  return apiRoot.post('/user/password', passwordObj, {
    headers: {
      Authorization: token,
    }
  })
}

// Order

export const getOrderList = () => apiRoot.get('/order');
export const updateOrder = (orderId) => apiRoot.get(`/order/${orderId}`);

