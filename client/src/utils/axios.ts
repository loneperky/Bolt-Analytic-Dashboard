import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // 🔥 Must-have for cookie auth
});

export default API;
