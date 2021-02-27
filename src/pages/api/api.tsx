import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    
    headers: {
        "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8" ,
          "Authorization"  : "eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJwcml2YXRla2V5LnBlbSIsInN1YiI6IjIxMzQ1Njc4OTA5IiwiaWF0IjoxNjE0MzgzMzQ4LCJleHAiOjE2MTQzODY5NDgsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6IlpoZTFDcWlIWTA2eTQwbUpjaGdMRFEifQ.S4pBc6GMEdn7H-YMqpI7gnbgKkvH5FZhOfXvkq1ZnVRGBL_02PXj5_E26_700eUEiSrWWze3SO9bx1tfaEWCxqzTZEv6-P_YxpmphFzgHqCfqvWpzL5hx7uAs85YcjUWq50h4jNRJregbbsKCgjGAqQZmVvCv9u97boW0YcWD01EVeKLhW5-WoQWna1PioE6UiMyP5vUEzR8ouH1avfInK758KuTZQcUsrm9Ikc_JCfLDPMowjBbxMZAzG0poN6SBpwVhqqTw8kEbvUqMPYGIMkzP31UpW3Qfgj-G7nMpV6iJvAvtGBYSYDlVHGN3BDw5q9DK6zVTIZmk7FCTpoFyg"

    }
});

export default api;

        //   "Authorization"  : localStorage.getItem('token')
