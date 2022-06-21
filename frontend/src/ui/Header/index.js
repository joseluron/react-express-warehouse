import Proptypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import './styles.scss';

import warehouseIcon from '../../assets/img/warehouse.png';

const Header = ({ routes }) => {
  const location = useLocation();

  return (
    <header className="header-wrapper">
      <nav className="links-wrapper">
        <Link to={'/'}>
          <img src={warehouseIcon} />
        </Link>
        <div>
          {routes.map(route => (
            <Link
              className={location.pathname === route.path ? 'underlined' : ''}
              key={route.to}
              to={route.path}
            >
              {route.to}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  routes: Proptypes.array.isRequired,
};

export default Header;
