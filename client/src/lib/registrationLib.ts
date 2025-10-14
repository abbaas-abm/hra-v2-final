import axios from "axios";

const registrationAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});


registrationAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('driver_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default registrationAPI;