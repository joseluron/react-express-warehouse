import axios from 'axios';

const buildOptions = () => {
  return { headers: { 'Content-Type': 'application/json' } };
};

export const post = async (url, payload) => {
  const res = await axios.post(url, payload, buildOptions);

  return res;
};

export const get = async url => {
  const res = await axios.get(url, buildOptions);

  return res;
};

export const patch = async (url, payload) => {
  const res = await axios.patch(url, payload, buildOptions);

  return res;
};

export const erase = async url => {
  const res = await axios.delete(url, buildOptions);

  return res;
};
