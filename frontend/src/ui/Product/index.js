import Proptypes from 'prop-types';

import './styles.scss';

import Article from '../Article';
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
            <Article
              key={article.art_id._id}
              name={article.art_id.name}
              amount={article.amount_of}
              simple
            />
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
