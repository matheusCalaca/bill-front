import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    
    headers: {
        "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8" ,
          "Authorization"  : "eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJwcml2YXRla2V5LnBlbSIsInN1YiI6IjIxMzQ1Njc4OTA5IiwiaWF0IjoxNjE0Mzg3Nzc4LCJleHAiOjE2MTQzOTEzNzgsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6InVHSnFibG1kQ2RTWUtNdkVkTGVkWEEifQ.S_EN7_8rW4XjnqpqpWoL_R4fVfHj8yVVzaVVxvhqRz0K-e9MKsglVUU4LIZ_z9GbPiK15nvYqxWD7izaL2wDrxC5wS_7WQUZMIbLOn8tCLO3-m0f9ixRujudnOyJ2f3Lg0vv-yl-UZUKFFx9YlhEHiNHMzJX7Tq66tyyJ1Vb3CMtiMw7F2MQdWI0jKdbXi7aX0F5RR-FMcXYyg7QlVa_pDQvy4gPSR3rwt38cahXh8IfV1Qjj5syIJPT8WPC0bX3jVOiGT9_0eFLH8E2J5T-yQFqac9G-0uIW3o6ZF8GxgSohE97mi5HN4I1jy7vtOc4l3Ey5lvZkMJvPU5ucZEWOg"

    }
});

export default api;

        //   "Authorization"  : localStorage.getItem('token')
