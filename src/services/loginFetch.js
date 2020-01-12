import { axios_get, axios_post } from './axios_config';

export const loginVerifyFetch = async (data) => {
  let r = await axios_post('/admin/login/verify', data);
  return r;
}

export const authVerifyFetch = async () => {
  let r = await axios_get('/admin/login');
  return r;
}

export const outVerifyFetch = async () => {
  let r = await axios_get('/admin/login/out');
  return r;
}
