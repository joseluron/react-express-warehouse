import PropTypes from 'prop-types';

import './styles.scss';

const Article = ({ name, stock, amount, simple }) => {
  return (
    <>
      <div
        className={`${simple ? 'article-wrapper-simple' : 'article-wrapper'}`}
      >
        <span>{name}</span>
        {stock ? <span>Stock: {stock}</span> : null}
        {amount ? <span>Amount of: {amount}</span> : null}
      </div>
    </>
  );
};

Article.propTypes = {
  name: PropTypes.string.isRequired,
  stock: PropTypes.string,
  amount: PropTypes.string,
  simple: PropTypes.bool,
};

export default Article;
