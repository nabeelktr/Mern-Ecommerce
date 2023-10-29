/* eslint-disable camelcase */
import axios from 'axios';
import { base_URL } from './constants';



  const instance = axios.create({

  baseURL: base_URL,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})



export default instance;
