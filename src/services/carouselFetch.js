import axios from 'axios';

require('./axios_config');

export const uploadcarouseFetch = async (data) => {
  let r = await axios.post('/admin/carousel', data);
  return r;
};

export const getcarouselFetch = async () => {
  let r = await axios.get('/admin/carousel');
  return r;
};
