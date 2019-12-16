import axios from 'axios';

export const loginFetch = async () => {
  let r = await axios.get('/signin/verify')
  console.log(r.data)
  return r.data
}
