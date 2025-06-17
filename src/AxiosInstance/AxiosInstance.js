import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://calculator.campingx.net/api/',
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization'); 
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
