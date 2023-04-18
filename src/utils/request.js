import axios from 'axios';
//http://localhost:8000
const request = axios.create({
  baseURL: 'https://blog-api-wut6.onrender.com',
});

export default request;
