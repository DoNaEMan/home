const { PORT } = require('./constant');

const LOCAL_HOST = '127.0.0.1';
const LOCAL_PORT = process.env[PORT] || 3000;
const DOMAIN = `http://${LOCAL_HOST}:${LOCAL_PORT}`;

const config = {
  LOCAL_HOST,
  LOCAL_PORT,
  DOMAIN,
};

module.exports = config;
