import { post, get } from '../api';

export const createArticles = async articles => {
  return post('http://localhost:8080/articles/bulk', articles);
};

export const fetchArticles = async () => {
  return get('http://localhost:8080/articles');
};
