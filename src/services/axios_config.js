import axios from 'axios';
import { message } from 'antd';

import { baseURL, tokenKey } from '../utils/config';

const axiosIns = axios.create({
  baseURL: baseURL,
  timeout: 20000
});

// 请求拦截器
axiosIns.interceptors.request.use(function (config) {
  const t = localStorage.getItem(tokenKey);
  t && (config.headers.common['Authorization'] = t)
  console.log('快看这是个请求拦截器！')
  return config
}, function (error) {
  console.log(error)
  return Promise.reject(error)
});

// 响应拦截器
axiosIns.interceptors.response.use(function (response) {
  if (response.data.result === 1) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data.msg);
  }
}, function (error) {
  console.log(error.response)
  // 这里的错误均为网络错误，非具体业务错误
  if (error.response) {
    return Promise.reject(error)
  } else {
    return Promise.reject(new Error('请求超时, 请刷新重试'))
  }
});

export const axios_get = (url, config = {}) => {
  return new Promise(async (resolve) => {
    axiosIns({
      method: 'get',
      url,
      ...config
    }).then(res_data => {
      res_data.msg && message.success(res_data.msg, 2);
      resolve(res_data);
    }).catch(error => {
      if (error.response && error.response.status === 403) {
        message.error(error.response.data.msg, 2);
        window.location.pathname === '/login' || (window.location.href = '/#login');
      } else {
        message.error(error.message, 2)
      }
    });
  })
};

export const axios_post = (url, data = {}, config = {}) => {
  return new Promise((resolve) => {
    axiosIns({
      method: 'post',
      url,
      data,
      ...config
    }).then(res_data => {
      console.log(res_data)
      res_data.msg && message.success(res_data.msg, 2);
      resolve(res_data);
    }).catch(error => {
      message.error(error.message, 2);
    });
  })
};
