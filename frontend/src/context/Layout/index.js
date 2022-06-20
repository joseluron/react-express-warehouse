import Proptypes from 'prop-types';

import './styles.scss';

import Header from '../../ui/Header';

const Layout = ({ routes, children }) => {
  return (
    <>
      <Header routes={routes} />
      <div className="main">{children}</div>
    </>
  );
};

Layout.propTypes = {
  routes: Proptypes.array.isRequired,
  children: Proptypes.node.isRequired,
};

export default Layout;
