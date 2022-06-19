import { Routes, Route } from 'react-router-dom';

import Layout from './context/Layout';
import Home from './context/Home';
import Articles from './context/Articles';
import Products from './context/Products';

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
