const path = require('path');
const Koa = require('koa');
const webpack = require('webpack');
const convert = require('koa-convert');
const serve = require('koa-static');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');

const main = require('./server.base');
const config = require('../../webpack/webpack.dev.js');

const compiler = webpack(config);

const app = new Koa();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(convert(webpackHotMiddleware(compiler)));

main(app);

// 启动静态服务器
app.use(serve(path.resolve(__dirname, '../../static')));

app.listen(3000, () => {
  console.log('DEV bin listening on port 3000!\n');
});
