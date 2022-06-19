import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const ROUTES = [
    { path: '/', to: 'Home' },
    { path: '/products', to: 'Products' },
    { path: '/articles', to: 'Articles' },
  ];

  return (
    <div>
      <header>
        <nav>
          {ROUTES.map(route => (
            <Link key={route.to} to={route.path}>
              {route.to}
            </Link>
          ))}
        </nav>
      </header>
      <div>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: Proptypes.node.isRequired,
};

export default Layout;
