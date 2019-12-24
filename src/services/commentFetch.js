import axios from 'axios';

require('./axios_config');

export const getcommentFetch = async (data) => {
  let r = await axios.post('/admin/comment', data);
  return r;
};

export const deletecommentFetch = async (data) => {
  let r = await axios.post('/admin/comment/delete', data);
  return r;
};
