import { useState } from 'react';

import './styles.scss';

import { useProducts } from '../../asyncData';
import Product from '../../ui/Product';
import Button from '../../ui/Button';

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
  const [fileName, setFileName] = useState('');
  const handleProductsChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = e => {
      setToAddProducts(JSON.parse(e.target.result));
    };
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <h2>Products</h2>
      <div className="add-product-wrapper">
        <div className="upload-file-wrapper">
          <div className="upload-file-container">
            <label className="upload-file-label">
              <input
                disabled={isLoadingAddProducts}
                type="file"
                onChange={handleProductsChange}
              />
              Upload file
            </label>
          </div>
          {fileName ? <span className="file-name">{fileName}</span> : null}
        </div>
        {fileName ? (
          <Button
            title={'Add products'}
            onClick={() => addProducts(toAddProducts)}
            disabled={isLoadingAddProducts}
          />
        ) : null}
      </div>
      <div className="add-product-info">
        {isLoadingAddProducts ? <p>Adding products</p> : null}
        {isErrorAddProducts ? <p>Products could not be created</p> : null}
        {isSuccessAddProducts ? <p>Products created successfully</p> : null}
      </div>
      <div className="products-list">
        {!isLoadingProducts && productsData
          ? productsData.data.products.map(product => (
              <div className="product" key={product._id}>
                <Product product={product} />
              </div>
            ))
          : null}
        {isErrorProducts ? (
          <p>No products on the database</p>
        ) : isLoadingProducts ? (
          <p>Loading products...</p>
        ) : null}
      </div>
    </>
  );
};

export default Products;
