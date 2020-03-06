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

export const sendCode = (email) => {
  console.log(email);
  return apiRoot.post('/auth/sendCode', { email });
}

export const checkCode = (body) => apiRoot.post('/auth/checkCode', body);

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

export const uploadImg = (payload) => {
  console.log('api', payload);
  const { formData, token } = payload;
  return apiRoot.post('/general/uploadImg', formData, {
    headers: {
      Authorization: token,
      // 'content-type': 'multipart/form-data',
      contentType: 'multipart/form-data'
    }
  })
}

// export const uploadBPProductFeaturesImage = (
//   body: UploadBPProductFeaturesImageBody,
// ) => apiRoot.post('/brands/product-features/images', body, {
//   headers: {
//     'content-type': 'multipart/form-data',
//   },
// });


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

export const getOrderList = ({ token }) => {
  console.log('getOrderList', token);
  return apiRoot.get('/order', {
    headers: {
      Authorization: token,
    }
  });
}

export const createOrder = ({payload, token}) => {
  console.log(payload, token);
  return apiRoot.post('/order/create', payload, {
    headers: {
      Authorization: token,
    }
  });
}

export const updateSubmitOrder = ({payload, token}) => {
  console.log({payload, token});
  return apiRoot.put('/order/submit/11')
}

