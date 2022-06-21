import { useQuery, useMutation } from 'react-query';

import { createArticles, fetchArticles, patchArticle } from './services';

import { useProducts } from '../products';

export const useArticles = () => {
  const { refetchAvailableProducts, removeAvailableProductsCache } =
    useProducts();

  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    isError: isErrorArticles,
    refetch: refetchArticles,
    remove: removeArticlesCache,
  } = useQuery(['articles'], () => fetchArticles());

  const {
    mutate: addArticles,
    isLoading: isLoadingAddArticles,
    isError: isErrorAddArticles,
    isSuccess: isSuccessAddArticles,
  } = useMutation(data => createArticles(data), {
    onSuccess: refetchArticles,
  });

  const {
    mutate: updateArticle,
    isLoading: isLoadingUpdateArticle,
    isError: isErrorUpdateArticle,
    isSuccess: isSuccessUpdateArticle,
  } = useMutation(
    ({ art_id, articleData }) => patchArticle(art_id, articleData),
    {
      onSuccess: async () => {
        removeAvailableProductsCache();
        refetchAvailableProducts();
        refetchArticles();
      },
    },
  );

  return {
    articlesData,
    isLoadingArticles,
    isErrorArticles,
    refetchArticles,
    removeArticlesCache,
    addArticles,
    isLoadingAddArticles,
    isErrorAddArticles,
    isSuccessAddArticles,
    updateArticle,
    isLoadingUpdateArticle,
    isErrorUpdateArticle,
    isSuccessUpdateArticle,
  };
};
