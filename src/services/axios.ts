import axios from 'axios';
import { API_BASE_URL } from './config';
import { getCookie } from './helpers';

// Create Axios instance with default configurations
const axiosinstance = axios.create({
  baseURL: API_BASE_URL,
  
});

// Request interceptor to set the token before sending requests
axiosinstance.interceptors.request.use(
  (config) => {
    const token = getCookie('token'); // Example: Retrieve token from HTTP cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});



export default axiosinstance;
