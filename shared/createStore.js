import { createStore } from 'redux';

import reducer from './reducer';

const arg = [reducer];

if (typeof window === 'object') {
  if (window.__server_state__) {
    arg.push(window.__server_state__);
  }
}

if (process.env.NODE_ENV === 'development') {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    arg.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}

export {
  createStore,
  arg,
};
