import axios from "axios";

const service = axios.create({
    // mode: 'cors',
    // headers: {
    //   // "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*", 
    //   "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //   "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"
    // },
    baseURL: process.env.REACT_APP_BASE_API,
    // withCredentials: true,
    timeout: 1000 * 3600,
    // credentials: "include",
    xsrfCookieName: "XSRF-TOKEN"
})
service.interceptors.request.use(
    (config) => {
      if (config.headers["Content-Type"] != "multipart/form-data") {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
      }
      return config;
    },
    (error) => {
      console.log(error); 
      return Promise.reject(error);
    }
  );

export default service;