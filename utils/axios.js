import axios from 'axios';

import log from './log';

axios.interceptors.request.use(function (config) {
  log(config);
  return config;
}, function (error) {
  log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  log(response);
  return response;
}, function (error) {
  log(error);
  return Promise.reject(error);
});

const _axios = axios;

export default _axios;