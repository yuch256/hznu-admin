import axios from 'axios';

require('./axios_config');

export const loginVerifyFetch = async (data) => {
  let r = await axios.post('/admin/login/verify', data);
  return r.data;
}

export const authVerifyFetch = async () => {
  let r = await axios.post('/admin/login');
  return r.data;
}

// const admin = async () => {
//   let data = await axios.post('/signup', {id: '256', name: 'admin', college: 0, pwd: 'y', rpwd: 'y' });
//   console.log(data)
// }
