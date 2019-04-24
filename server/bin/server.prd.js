const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');

const main = require('./server.base');

const app = new Koa();

main(app);

// 启动静态服务器
app.use(serve(path.resolve(__dirname, '../../dist')));
app.use(serve(path.resolve(__dirname, '../../static')));

app.listen(3000, () => {
  console.log('PRD bin listening on port 3000!\n');
});
