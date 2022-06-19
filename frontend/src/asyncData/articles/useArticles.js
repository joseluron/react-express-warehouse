import { useMutation } from 'react-query';

import { createArticles } from './services';

export const useArticles = () => {
  const {
    mutate: addArticles,
    isLoading: isLoadingAddArticles,
    isError: isErrorAddArticles,
    isSuccess: isSuccessAddArticles,
  } = useMutation(data => createArticles(data));

  return {
    addArticles,
    isLoadingAddArticles,
    isErrorAddArticles,
    isSuccessAddArticles,
  };
};
