import axios from 'axios';

import log from './log';

axios.interceptors.request.use(function (config) {
  log(config, 'request');
  return config;
}, function (error) {
  log(error, 'request');
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  log(response, 'response');
  return response;
}, function (error) {
  log(error, 'response');
  return Promise.reject(error);
});

const _axios = axios;

export default _axios;