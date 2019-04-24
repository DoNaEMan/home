import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

const arg = [reducer];

if (typeof window === 'object') {
  if (window.__server_state__) {
    arg.push(window.__server_state__);
  }
}

if (process.env.NODE_ENV === 'development') {
  arg.push(composeWithDevTools(applyMiddleware()));
}

export {
  createStore,
  arg,
};
