import { post } from '../api';

export const createProducts = async products => {
  return post('http://localhost:8080/products/bulk', products);
};
