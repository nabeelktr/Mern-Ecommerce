/* eslint-disable camelcase */
import axios from 'axios';
import { base_URL } from './constants';




const instance = axios.create({

  baseURL: base_URL,
  withCredentials: true,
});

// instance.interceptors.request.use((req) => {
//   const token = localStorage.getItem('userToken');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// instance.interceptors.response.use(
//   function (config) {

//     return config;
//   },
//   async function (error) {
//     console.log(error.response.status);
//     if(error.response.status === 401){

//      try {
//       const newToken = localStorage.getItem('userRefreshToken');


//       if (newToken) {

//         const resp = await instance.post('/refresh', {newToken});
//         localStorage.setItem('userToken', resp.data)


//         return axios(error.config);
//       }else{
//       window.location = ('/login')
//       }
//     } catch (refreshError) {

//       console.log(refreshError);
//       window.location = ('/login')
//     }
//     }

//       return Promise.reject(error);

//   }
// );



export default instance;
