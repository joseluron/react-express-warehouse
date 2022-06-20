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
            <div className="product-container">
              <Product
                product={product}
                sellProduct={sellProduct}
                isLoadingSellProduct={isLoadingSellProduct}
              />
            </div>
          ))
        : null}
      {isErrorAvailableProducts ? (
        <p>An error ocurred while fetching available products</p>
      ) : null}
    </>
  );
};

export default Home;
