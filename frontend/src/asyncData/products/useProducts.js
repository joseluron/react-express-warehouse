import { useMutation, useQuery } from 'react-query';

import { createProducts, fetchProducts } from './services';

export const useProducts = () => {
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useQuery(['products'], () => fetchProducts());

  const {
    mutate: addProducts,
    isLoading: isLoadingAddProducts,
    isError: isErrorAddProducts,
    isSuccess: isSuccessAddProducts,
  } = useMutation(data => createProducts(data), {
    onSuccess: refetchProducts,
  });

  return {
    productsData,
    isLoadingProducts,
    isErrorProducts,
    refetchProducts,
    addProducts,
    isLoadingAddProducts,
    isErrorAddProducts,
    isSuccessAddProducts,
  };
};
