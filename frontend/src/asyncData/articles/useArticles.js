import { useMutation } from 'react-query';

import { createArticles } from './services';

export const useArticles = () => {
  const {
    mutate: addArticles,
    isLoading: isLoadingAddArticles,
    isError: isErrorAddArticles,
  } = useMutation(data => createArticles(data), {
    onSuccess: () => console.log('Added articles successfully'),
  });

  return {
    addArticles,
    isLoadingAddArticles,
    isErrorAddArticles
  }
};