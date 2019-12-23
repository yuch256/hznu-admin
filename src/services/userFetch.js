import axios from 'axios';

require('./axios_config');

export const getuserFetch = async () => {
  let r = await axios.get('/admin/user');
  return r;
};

export const deleteuserFetch = async (data) => {
  let r = await axios.post('/admin/user/delete', data);
  return r;
};

export const adduserFetch = async (data) => {
  let r = await axios.post('/admin/user/add', data);
  return r;
};
