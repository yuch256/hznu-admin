import axios from 'axios';

import { developBaseURL, tokenKey } from '../utils/config';

// Global axios defaults
axios.defaults.baseURL = developBaseURL;

// 请求拦截器
axios.interceptors.request.use(function (config) {
  const t = localStorage.getItem(tokenKey);
  if (t) {
    config.headers.common['Authorization'] = t
  }
  console.log('快看这是个请求拦截器！')
  return config
}, function (error) {
  console.log('no token')
  return Promise.reject(error)
});
