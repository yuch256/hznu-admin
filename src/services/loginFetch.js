import axios from 'axios';

import { developBaseURL, tokenKey } from '../utils/config';

axios.defaults.baseURL = developBaseURL;
// 请求拦截器
axios.interceptors.request.use(function (config) {
  const t = window.localStorage.getItem(tokenKey);
  if (t) {
    config.headers.common['Authorization'] = t
  }
  console.log('快看这是个请求拦截器！')
  return config
}, function (error) {
  console.log('no token')
  return Promise.reject(error)
});

export const loginVerifyFetch = async (data) => {
  let r = await axios.post('/admin/login/verify', data)
  return r.data
}

export const authVerifyFetch = async () => {
  let r = await axios.post('/admin/login');
  return r.data;
}

// const admin = async () => {
//   let data = await axios.post('/signup', {id: '256', name: 'admin', college: 0, pwd: 'y', rpwd: 'y' });
//   console.log(data)
// }
