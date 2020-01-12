import { axios_post } from './axios_config';

export const addnewsFetch = async (data) => {
  let r = await axios_post('/admin/news/add', data);
  return r;
};

export const selnewsFetch = async (data) => {
  let r = await axios_post('/admin/news', data);
  return r;
};

export const updatenewsFetch = async (data) => {
  let r = await axios_post('/admin/news/update', data);
  return r;
};

export const deletenewsFetch = async (data) => {
  let r = await axios_post('/admin/news/delete', data);
  return r;
};
