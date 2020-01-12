import { axios_post } from './axios_config';

export const getcommentFetch = async (data) => {
  let r = await axios_post('/admin/comment', data);
  return r;
};

export const getcommentcountFetch = async (data) => {
  let r = await axios_post('/admin/comment/count', data);
  return r;
}

export const deletecommentFetch = async (data) => {
  let r = await axios_post('/admin/comment/delete', data);
  return r;
};
