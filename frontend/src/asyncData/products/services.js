import { post, get } from '../api';

export const createProducts = async products => {
  return post('http://localhost:8080/products/bulk', products);
};

export const fetchProducts = async () => {
  return get('http://localhost:8080/products');
};
