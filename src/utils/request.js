import axios from "axios";

const service = axios.create({
    // mode: 'cors',
    // headers: {
    //   "Content-Type": "application/json",
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
      config.headers["Content-Type"] = "application/json";
    }
    const token = localStorage.getItem('token')? localStorage.getItem('token'): null
    if(token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    console.log("hahaah")
    const data = !response.data.data ? response.data : response.data.data;
    const headers = response.headers;
    if(data.access_token != undefined && data.access_token != '') {
      localStorage.setItem('token', data.access_token)
    }
    // if (headers.authorization != undefined) {
    //   console.log('lot to bo')
    //   // store.commit("authUser/SET_TOKEN", headers.authorization);
    //   localStorage.setItem('token', headers.authorization)
      
    //   if (typeof data == "Object") {
    //     data.token = headers.authorization;
    //   }
    // }
    if (!data) {
      // return Promise.reject(new Error("Network Error"));
      return { data: "", headers };
    }
    return { data: data, headers };
  },
  (error) => {
    // console.log("co error kia")
     if(error.response) {
      // console.log("response", error.response)
     }
     return Promise.reject(error);
    // return { status: error.response.status, message: error.message };
    // router.push({ name: "error", params: {} });
  }
);


export default service;