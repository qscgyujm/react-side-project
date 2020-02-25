import axios from 'axios';

const apiRoot = axios.create({
  baseURL: 'http://localhost:1337/',
});

const getTestProduct = () => apiRoot.get('/test/testing');

export default {
  getTestProduct,
}

