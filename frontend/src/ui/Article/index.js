import { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

import Button from '../Button';

const Article = ({
  name,
  art_id,
  stock,
  amount,
  simple,
  updateArticle,
  isLoadingUpdateArticle,
}) => {
  const [articleStock, setArticleStock] = useState(stock);
  const handleStockChange = e => setArticleStock(e.target.value);

  return (
    <>
      <div
        className={`${simple ? 'article-wrapper-simple' : 'article-wrapper'}`}
      >
        <span>{name}</span>
        {stock ? (
          <div className="article-stock">
            <span>Stock: </span>
            <input
              type="text"
              value={articleStock}
              onChange={handleStockChange}
            />
            <Button
              disabled={isLoadingUpdateArticle}
              title="Update Stock"
              onClick={() =>
                updateArticle({
                  art_id,
                  articleData: { stock: articleStock },
                })
              }
            />
          </div>
        ) : null}
        {amount ? <span>Amount of: {amount}</span> : null}
      </div>
    </>
  );
};

Article.propTypes = {
  name: PropTypes.string.isRequired,
  art_id: PropTypes.string,
  stock: PropTypes.string,
  amount: PropTypes.string,
  simple: PropTypes.bool,
  updateArticle: PropTypes.func,
  isLoadingUpdateArticle: PropTypes.bool,
};

export default Article;
