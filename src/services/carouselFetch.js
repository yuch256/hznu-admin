import { axios_get, axios_post } from './axios_config';

export const uploadcarouseFetch = async (data) => {
  let r = await axios_get('/admin/carousel', data);
  return r;
};

export const getcarouselFetch = async () => {
  let r = await axios_post('/admin/carousel');
  return r;
};
