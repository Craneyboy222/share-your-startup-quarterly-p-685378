import axios, { AxiosInstance } from 'axios';

export const useApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // Add auth token to request headers
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle global errors
      if (error.response.status === 401) {
        // Handle unauthorized access
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
