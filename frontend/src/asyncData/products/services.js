import { post, get, erase } from '../api';

export const createProducts = async products => {
  return post('http://localhost:8080/products/bulk', products);
};

export const fetchProducts = async () => {
  return get('http://localhost:8080/products');
};

export const fetchAvailableProducts = async () => {
  return get('http://localhost:8080/products/available');
};

export const deleteSellingProduct = async productId => {
  return erase(`http://localhost:8080/products/sell/product_id/${productId}`);
};
