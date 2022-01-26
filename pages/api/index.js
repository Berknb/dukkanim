import axios from "axios";

const axiosInstance = axios.create({baseURL:"https://api.akilliticaretim.com"})

axiosInstance.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json'
      config.headers["GUID"] = "A3A7-CD3A-FEB6-15A3"
      const token = localStorage.getItem("token");
      if(token){
        config.headers['Authorization'] = `Bearer ${token}`
      }
    return config;
}, (error) => {
    if (debug) { console.error("✉️ ", error); }
    return Promise.reject(error);
});
export default axiosInstance;