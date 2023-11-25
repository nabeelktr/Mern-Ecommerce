/* eslint-disable camelcase */
import axios from 'axios';
import { base_URL } from '../utils/constants';




const instance = axios.create({

  baseURL: base_URL,
  withCredentials: true,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


instance.interceptors.response.use(
  function (config) {

    return config;
  },
  async function (error) {
    if(error.response.status === 401){

     try {


        const resp = await instance.get('/refresh');
        localStorage.setItem('userToken', resp.data)


        return instance(error.config);

          } catch (refreshError) {

      localStorage.removeItem('userToken')
      window.location = ('/login')
    }
    }

      return Promise.reject(error);

  }
);



export default instance;
