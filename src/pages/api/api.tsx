import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    
    headers: {
        "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization", 
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8" ,
          "Authorization"  : "eyJraWQiOiIvcHJpdmF0ZWtleS5wZW0iLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJwcml2YXRla2V5LnBlbSIsInN1YiI6IjIxMzQ1Njc4OTA5IiwiaWF0IjoxNjE0Mzk1MDE3LCJleHAiOjE2MTQzOTg2MTcsImdyb3VwcyI6WyJVU0VSIl0sImp0aSI6Ii1nSmlxdS1sX3BVQUQ3TlBUa0NUOWcifQ.axqsnmU80UfSg_oZVWFQ_pJ38xe81sFnjqzx4jAByYUktj-LIMK8xuCVJwSvJ2RZf3BDWcssYP3io3437VSPJmBp9QibP-7fPcAOKJ7mOlXcEu3SP9XcbwN52BgCSvnEFwPuy53TetEJ1WgzM26W7MELTx76xAVVYKWAqfbA_q0NtbTgqLCBxXiTm7XKTrK5g8p93Lc4G6fYsYvzYu8ma-u0Q0stqfaOKPq-sJAnVcmomci4r3Xd2DozqmBpkJwL-H2Msdi2RlhIY2PHUtyHqOPvOYq2SfAlmtvtAv-QbrffSnT5KKV8Sv2mTajOt7aSlNIOned1eVySJPqqHdxRMQ"

    }
});

export default api;

        //   "Authorization"  : localStorage.getItem('token')
