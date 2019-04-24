const path = require('path');
const fs = require('fs');
const koaCompose = require('koa-compose');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');

const middlewares = require('../../server/middleware/index');

const main = (app) => {
  // 中间件
  app.use(koaCompose(middlewares));
  // 目标引擎
  app.use(views(path.resolve(__dirname, '../../'), {
    map: {
      html: 'ejs',
    },
  }));
  // 解析请求报文体body
  app.use(bodyParser());
  // 收集 ./router 文件夹中的所有router, 并且用registerRouter函数注册
  const collectRouter = (registerRouter) => {
    const routerPath = path.resolve(__dirname, '../router');
    fs.readdirSync(routerPath).filter(filename => filename.endsWith('.js')).forEach((filename) => {
      const subRouter = require(`${routerPath}/${filename}`);
      if (registerRouter) return registerRouter(subRouter, filename);
    });
  };
  // 所有path为/api/* 的http请求路由
  const apiRouter = new Router({ prefix: '/api' });
  // 所有path不为/api/* 的http请求路由，与react客户端路由同步
  const pagesRouter = new Router();
  collectRouter((subRouter, filename) => {
    if (filename !== 'pages.js') {
      apiRouter.use(subRouter.routes()).use(subRouter.allowedMethods());
    } else if (filename === 'pages.js') {
      pagesRouter.use(subRouter.routes()).use(subRouter.allowedMethods());
    }
  });

  app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
  app.use(pagesRouter.routes()).use(pagesRouter.allowedMethods());
};


module.exports = main;
