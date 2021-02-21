import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_HOST_BILL,
    
    headers: {
        "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8" ,
          "Authorization"  : localStorage.getItem('token')
    }
});

export default api;