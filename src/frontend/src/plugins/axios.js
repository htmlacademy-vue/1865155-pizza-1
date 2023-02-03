import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    alert(e.response.data.error.message);
    return Promise.reject(e);
  }
);

export default axiosInstance;
