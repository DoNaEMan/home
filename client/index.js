import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

import { createClientRootComponent } from '../shared/createRootComponent';

loadableReady(() => {
  ReactDOM.hydrate(
    createClientRootComponent(),
    document.getElementById('root'),
  );
});
