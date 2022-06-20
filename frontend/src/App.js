import { Routes, Route } from 'react-router-dom';

import Layout from './context/Layout';
import Home from './context/Home';
import Articles from './context/Articles';
import Products from './context/Products';

function App() {
  const ROUTES = [
    { path: '/', to: 'Home', element: <Home /> },
    { path: '/products', to: 'Products', element: <Products /> },
    { path: '/articles', to: 'Articles', element: <Articles /> },
  ];

  return (
    <>
      <Layout routes={ROUTES}>
        <Routes>
          {ROUTES.map(route => (
            <Route key={route.to} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
