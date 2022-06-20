import Proptypes from 'prop-types';

import './styles.scss';

import Button from '../Button';

const Product = ({ product, sellProduct, isLoadingSellProduct }) => {
  const { name, contain_articles } = product;

  return (
    <>
      <div className="product-wrapper">
        <div className="product-title">
          <span>{name}</span>
        </div>
        <div className="product-articles">
          {contain_articles.map(article => (
            <span key={article.art_id._id} className="article">
              {article.art_id.name}
            </span>
          ))}
          {sellProduct ? (
            <Button
              title="Sell"
              onClick={() => sellProduct(product._id)}
              disabled={isLoadingSellProduct}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

Product.propTypes = {
  product: Proptypes.object.isRequired,
  sellProduct: Proptypes.func,
  isLoadingSellProduct: Proptypes.bool,
};

export default Product;
