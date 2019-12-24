import axios from 'axios';

require('./axios_config');

export const loginVerifyFetch = async (data) => {
  let r = await axios.post('/admin/login/verify', data);
  return r.data;
}

export const authVerifyFetch = async () => {
  let r = await axios.get('/admin/login');
  return r.data;
}

export const outVerifyFetch = async () => {
  let r = await axios.get('/admin/login/out');
  return r;
}
