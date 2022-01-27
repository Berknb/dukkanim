import axios from "axios";

const axiosInstance = axios.create({baseURL:"https://api.akilliticaretim.com"})
const axiosRefresh = axios.create({baseURL:""})

axiosInstance.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json'
      config.headers["GUID"] = "A3A7-CD3A-FEB6-15A3"
      const token = localStorage.getItem("token");
      if(token){
        config.headers['Authorization'] = `Bearer ${token}`
      }
    return config;
}, (error) => {
    if (debug) { console.error(error); }
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refresh = localStorage.getItem("refresh")            
    axios.defaults.headers.common['Authorization'] = `Bearer ${refresh}`;
    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosInstance;