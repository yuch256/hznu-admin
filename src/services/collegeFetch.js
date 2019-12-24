import axios from 'axios';

require('./axios_config');

export const getallcollegeFetch = async () => {
  let r = await axios.get('/admin/user/college');
  return r;
};
