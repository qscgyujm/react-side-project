import { apiRoot } from './apiRoot';

export const getProfile = (token) => {
  return apiRoot.get('/user', {
    headers: {
      Authorization: token,
    }
  });
}
export const updateProfile = ({body, token}) => {
  return apiRoot.put('/user/profile', body, {
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