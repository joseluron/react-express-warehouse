import { useMutation, useQuery } from 'react-query';

import {
  createProducts,
  fetchProducts,
  fetchAvailableProducts,
} from './services';

export const useProducts = () => {
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    refetch: refetchProducts,
  } = useQuery(['products'], () => fetchProducts());

  const {
    data: availableProductsData,
    isLoading: isLoadingAvailableProducts,
    isError: isErrorAvailableProducts,
    refetch: refetchAvailableProducts,
  } = useQuery(['availableProducts'], () => fetchAvailableProducts());

  const {
    mutate: addProducts,
    isLoading: isLoadingAddProducts,
    isError: isErrorAddProducts,
    isSuccess: isSuccessAddProducts,
  } = useMutation(data => createProducts(data), {
    onSuccess: () => {
      refetchProducts();
      refetchAvailableProducts();
    },
  });

  return {
    productsData,
    isLoadingProducts,
    isErrorProducts,
    availableProductsData,
    isLoadingAvailableProducts,
    isErrorAvailableProducts,
    refetchProducts,
    addProducts,
    isLoadingAddProducts,
    isErrorAddProducts,
    isSuccessAddProducts,
  };
};
