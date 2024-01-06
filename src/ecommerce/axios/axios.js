import axios from 'axios';

export const service = axios.create({
  // baseURL: 'https://shiny-getup-deer.cyclic.app/api/v1',
  baseURL: 'http://localhost:5000/api/v1',
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
