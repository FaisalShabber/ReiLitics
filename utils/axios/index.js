import axios from "axios";

const axiosNodeApi = axios.create({
  baseURL: "https://admin.reilitics.com/api",
  //   baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

export default axiosNodeApi;

axiosNodeApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
