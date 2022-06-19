import { useState } from 'react';

import { useArticles, useProducts } from './asyncData/';

function App() {
  const {
    articlesData,
    isLoadingArticles,
    isErrorArticles,
    addArticles,
    isLoadingAddArticles,
    isErrorAddArticles,
    isSuccessAddArticles,
  } = useArticles();

  const {
    productsData,
    isLoadingProducts,
    isErrorProducts,
    availableProductsData,
    isLoadingAvailableProducts,
    isErrorAvailableProducts,
    addProducts,
    isLoadingAddProducts,
    isErrorAddProducts,
    isSuccessAddProducts,
    sellProduct,
    isLoadingSellProduct
  } = useProducts();

  const [toAddArticles, setToAddArticles] = useState({});
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      setToAddArticles(JSON.parse(e.target.result));
    };
  };

  const [toAddProducts, setToAddProducts] = useState({});
  const handleProductsChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      setToAddProducts(JSON.parse(e.target.result));
    };
  };

  return (
    <div>
      <div>
        <input
          disabled={isLoadingAddArticles}
          type="file"
          onChange={handleChange}
        />
        <button
          disabled={isLoadingAddArticles}
          onClick={() => addArticles(toAddArticles)}
        >
          Add Articles
        </button>
        {isLoadingAddArticles ? <p>Adding articles</p> : null}
        {isErrorAddArticles ? <p>Articles could not be created</p> : null}
        {isSuccessAddArticles ? <p>Articles created successfully</p> : null}
      </div>
      <div>
        {!isLoadingArticles && articlesData ? (
          articlesData.data.articles.map(article => (
            <p key={article._id}>{article.name}</p>
          ))
        ) : (
          <p>Loading Articles</p>
        )}
        {isErrorArticles ? (
          <p>An error ocurred while fetching articles</p>
        ) : null}
      </div>
      <div>
        <input
          disabled={isLoadingAddProducts}
          type="file"
          onChange={handleProductsChange}
        />
        <button
          disabled={isLoadingAddProducts}
          onClick={() => addProducts(toAddProducts)}
        >
          Add Products
        </button>
        {isLoadingAddProducts ? <p>Adding products</p> : null}
        {isErrorAddProducts ? <p>Products could not be created</p> : null}
        {isSuccessAddProducts ? <p>Products created successfully</p> : null}
      </div>
      <div>
        {!isLoadingProducts && productsData ? (
          productsData.data.products.map(products => (
            <p key={products._id}>{products.name}</p>
          ))
        ) : (
          <p>Loading Products</p>
        )}
        {isErrorProducts ? (
          <p>An error ocurred while fetching products</p>
        ) : null}
      </div>
      <div>
        <h2>Available Product</h2>
        {!isLoadingAvailableProducts && availableProductsData
          ? availableProductsData.data.availableProducts.map(product => (
              <div key={product._id}>
                <span>{product.name}</span>
                <button disabled={isLoadingSellProduct} onClick={() => sellProduct(product._id)}>Sell</button>
              </div>
            ))
          : null}
        {isErrorAvailableProducts ? (
          <p>An error ocurred while fetching available products</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;
