import Proptypes from 'prop-types';

import Header from '../../ui/Header';

const Layout = ({ routes, children }) => {
  return (
    <div>
      <Header routes={routes} />
      <div>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  routes: Proptypes.array.isRequired,
  children: Proptypes.node.isRequired,
};

export default Layout;
