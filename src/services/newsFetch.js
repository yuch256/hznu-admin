import axios from 'axios';

require('./axios_config');

export const addnewsFetch = async (data) => {
  let r = await axios.post('/admin/news/add', data);
  return r;
};
