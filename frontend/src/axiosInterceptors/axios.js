/* eslint-disable camelcase */
import axios from 'axios';
import { base_URL } from '../components/constants/constants';

const token = localStorage.getItem('adminToken');
const instance = axios.create({

  baseURL: base_URL,
});

instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default instance;
