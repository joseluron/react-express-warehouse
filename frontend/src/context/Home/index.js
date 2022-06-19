import { useState } from 'react';

import { useProducts } from '../../asyncData';

const Home = () => {
  const {
    availableProductsData,
    isLoadingAvailableProducts,
    isErrorAvailableProducts,
    sellProduct,
    isLoadingSellProduct,
  } = useProducts();

  return (
    <div>
      <div>
        <h2>Available Product</h2>
        {!isLoadingAvailableProducts && availableProductsData
          ? availableProductsData.data.availableProducts.map(product => (
              <div key={product._id}>
                <span>{product.name}</span>
                <button
                  disabled={isLoadingSellProduct}
                  onClick={() => sellProduct(product._id)}
                >
                  Sell
                </button>
              </div>
            ))
          : null}
        {isErrorAvailableProducts ? (
          <p>An error ocurred while fetching available products</p>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
