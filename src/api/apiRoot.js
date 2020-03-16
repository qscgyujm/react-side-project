import axios from 'axios';

const url = process.env.REACT_APP_LOCAL_URL ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_URL;

export const apiRoot = axios.create({
  baseURL: url,
});
