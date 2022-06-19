import { useState } from 'react';

import { useProducts } from '../../asyncData';

const Products = () => {
  const {
    productsData,
    isLoadingProducts,
    isErrorProducts,
    addProducts,
    isLoadingAddProducts,
    isErrorAddProducts,
    isSuccessAddProducts,
  } = useProducts();

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
    </div>
  );
};

export default Products;
