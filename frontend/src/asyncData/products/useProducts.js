import { useMutation, useQuery } from 'react-query';

import {
  createProducts,
  fetchProducts,
  fetchAvailableProducts,
  deleteSellingProduct,
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
    remove: removeAvailableProductsCache,
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

  const {
    mutate: sellProduct,
    isLoading: isLoadingSellProduct,
    isError: isErrorSellProduct,
    isSuccess: isSuccessSellProduct,
  } = useMutation(data => deleteSellingProduct(data), {
    onSuccess: () => {
      removeAvailableProductsCache();
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
    removeAvailableProductsCache,
    refetchAvailableProducts,
    addProducts,
    isLoadingAddProducts,
    isErrorAddProducts,
    isSuccessAddProducts,
    sellProduct,
    isLoadingSellProduct,
    isErrorSellProduct,
    isSuccessSellProduct,
  };
};
