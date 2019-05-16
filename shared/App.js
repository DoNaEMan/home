import React from 'react';
import { renderRoutes } from 'react-router-config';

import Layout from './components/common/Layout/index';

const App = ({ route }) => (
  <Layout>
    {renderRoutes(route.routes)}
  </Layout>
);

export default App;