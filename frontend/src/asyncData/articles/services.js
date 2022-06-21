import { post, get, patch } from '../api';

export const createArticles = async articles => {
  return post('http://localhost:8080/articles/bulk', articles);
};

export const fetchArticles = async () => {
  return get('http://localhost:8080/articles');
};

export const patchArticle = async (art_id, articleData) => {
  return patch(`http://localhost:8080/articles/art_id/${art_id}`, articleData);
};
