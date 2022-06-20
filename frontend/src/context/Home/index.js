import { useProducts } from '../../asyncData';

import './styles.scss';

import Product from '../../ui/Product/index.js';

const Home = () => {
  const {
    availableProductsData,
    isLoadingAvailableProducts,
    isErrorAvailableProducts,
    sellProduct,
    isLoadingSellProduct,
  } = useProducts();

  return (
    <>
      <h2>Available Products</h2>
      {!isLoadingAvailableProducts && availableProductsData
        ? availableProductsData.data.availableProducts.map(product => (
            <div key={product._id} className="product-container">
              <Product
                product={product}
                sellProduct={sellProduct}
                isLoadingSellProduct={isLoadingSellProduct}
              />
            </div>
          ))
        : null}
      {isErrorAvailableProducts ? (
        <p>No products available</p>
      ) : isLoadingAvailableProducts ? (
        <p>Loading products...</p>
      ) : null}
    </>
  );
};

export default Home;
