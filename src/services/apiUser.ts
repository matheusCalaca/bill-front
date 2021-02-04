import axios from 'axios';

//     //   "Access-Control-Allow-Headers": "Authorization", 
const api = axios.create({
    baseURL: 'http://localhost:8082',

    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/json;charset=UTF-8"
    }
});

export default api;