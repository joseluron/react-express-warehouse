import axios from 'axios';

const buildOptions = () => {
  return { headers: { 'Content-Type': 'application/json' } };
};

export const post = async (url, payload) => {
  const res = await axios.post(url, payload, buildOptions);

  return res;
};
