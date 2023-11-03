/* eslint-disable camelcase */
import axios from 'axios';
import { base_URL } from './constants';


  const instance = axios.create({

  baseURL: base_URL,
  //withCredentials: true,
});

// instance.interceptors.request.use((req) => {

//   const token = localStorage.getItem('adminToken');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// })

// Add an interceptor to set authorization header with user token before requests
instance.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = localStorage.getItem("adminToken");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    console.log('ee',error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {

    return config;
  },
  function (error) {
    console.log(error.response.status);
    return Promise.reject(error);
  }
);

export default instance;
