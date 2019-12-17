import axios from 'axios';

export const loginFetch = async (data) => {
  let r = await axios.post('/admin/login/verify', data)
  console.log(r.data)
  return r.data
}
