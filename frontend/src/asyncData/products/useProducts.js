import { useMutation } from 'react-query';

import { createProducts } from './services';

export const useProducts = () => {
  const {
    mutate: addProducts,
    isLoading: isLoadingAddProducts,
    isError: isErrorAddProducts,
    isSuccess: isSuccessAddProducts,
  } = useMutation(data => createProducts(data), {
    onSuccess: () => console.log('Products created successfully'),
  });

  return {
    addProducts,
    isLoadingAddProducts,
    isErrorAddProducts,
    isSuccessAddProducts,
  };
};
