import { useQuery, useMutation } from 'react-query';

import { createArticles, fetchArticles } from './services';

export const useArticles = () => {
  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    isError: isErrorArticles,
    refetch: refetchArticles,
  } = useQuery(['articles'], () => fetchArticles());

  const {
    mutate: addArticles,
    isLoading: isLoadingAddArticles,
    isError: isErrorAddArticles,
    isSuccess: isSuccessAddArticles,
  } = useMutation(data => createArticles(data), {
    onSuccess: refetchArticles,
  });

  return {
    articlesData,
    isLoadingArticles,
    isErrorArticles,
    addArticles,
    isLoadingAddArticles,
    isErrorAddArticles,
    isSuccessAddArticles,
  };
};
