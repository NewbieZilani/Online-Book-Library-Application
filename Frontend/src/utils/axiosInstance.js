import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/users'
  
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
console.log(config);
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export const axiosInstanceBook = axios.create({
  baseURL: "http://localhost:8081/books",
  timeout: 3000,
});

axiosInstanceBook.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default axiosInstance;
