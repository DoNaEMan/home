const { DEV, DEPLOY_ENV } = require('./constant');

module.exports = require(`./config.${process.env[DEPLOY_ENV] || DEV}`);
