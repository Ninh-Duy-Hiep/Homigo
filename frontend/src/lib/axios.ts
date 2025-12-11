import { ApiErrorResponse } from '@/types/api';
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config && error.config.url && error.config.url.includes('/auth/login');

    if (error.response?.status === 401 && !isLoginRequest) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(err: unknown): string {
  let message = "An unexpected error occurred";

  if (err instanceof AxiosError) {
    const errorData = err.response?.data as ApiErrorResponse | undefined;
    if (errorData) {
      if (Array.isArray(errorData.validationErrors) && errorData.validationErrors.length > 0) {
        message = errorData.validationErrors[0].error;
      } else if (Array.isArray(errorData.message)) {
        message = errorData.message[0];
      } else {
        message = errorData.message || errorData.error || message;
      }
    } else {
      message = err.message;
    }
  } else if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  }

  return message;
}


export default axiosInstance;