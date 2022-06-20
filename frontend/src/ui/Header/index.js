import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

import warehouseIcon from '../../assets/img/warehouse.png';

const Header = ({ routes }) => {
  return (
    <header className="header-wrapper">
      <nav className="links-wrapper">
        <Link to={'/home'}>
          <img src={warehouseIcon} />
        </Link>
        <div>
          {routes.map(route => (
            <Link key={route.to} to={route.path}>
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
