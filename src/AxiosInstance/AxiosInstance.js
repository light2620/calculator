import axios from 'axios';

const token = localStorage.getItem("Authorization")

const axiosInstance = axios.create({
  baseURL: 'https://calculator.campingx.net/api/',
  headers: {
    Authorization: token ? token : "",
  },
});

export default axiosInstance;
