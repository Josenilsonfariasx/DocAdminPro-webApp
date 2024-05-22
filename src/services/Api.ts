import axios from 'axios'
export const Api = axios.create({
  baseURL: 'http://localhost:80/api/',
  timeout: 1000,
})