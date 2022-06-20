import PropTypes from 'prop-types';

import './styles.scss';

const Button = ({ title, onClick, ...rest }) => {
  return (
    <button className="button" {...rest} onClick={onClick}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
