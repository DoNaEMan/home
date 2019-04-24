import React from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';

import Layout from './components/Layout';

let App = ({ route }) => (
  <Layout>
    {renderRoutes(route.routes)}
  </Layout>
);

if (process.env.NODE_ENV === 'development') {
  // react热更新
  App = hot(module)(App);
}

export default App;
