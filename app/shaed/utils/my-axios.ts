import axios from "@/node_modules/axios/index";

const API_URL = 'http://localhost:38000';

const api = axios.create({
  baseURL: API_URL
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api.interceptors.response.use(resq => {
  return resq
}, (error) => {
  console.log("NOK");
  console.log(error.response);
  if (error.response.this.state == 403) {
    location.href = "/"
  } else if (error.response.state == 404) {
    window.location.href = "/not-found"
  }
  return Promise.reject(error)
})


export default api;