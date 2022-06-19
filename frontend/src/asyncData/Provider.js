import PropTypes from 'prop-types';

import { QueryClient, QueryClientProvider } from 'react-query';

const QueryProvider = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

QueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QueryProvider;
