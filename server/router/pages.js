/* eslint-disable consistent-return */
/* eslint-disable no-console */
let generateScopedName = '[local]__[hash:5]';
if (process.env.NODE_ENV === 'development') {
  generateScopedName = '[path][name]__[local]';
}

require('@babel/register')({
  ignore: [/node_modules\//, /node_modules\\/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime', '@loadable/babel-plugin', 'dynamic-import-node', 'add-module-exports'],
});

// less css hook
require('css-modules-require-hook')({
  extensions: ['.less', '.css'],
  processorOpts: { parser: require('postcss-less').parse },
  generateScopedName,
});

// image compiler hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp', 'ico'],
  limit: 8000,
});

const path = require('path');
const Router = require('koa-router');
const { renderToString } = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server');
const { matchRoutes } = require('react-router-config');
const { createStore } = require('redux');

const statsFile = path.resolve(__dirname, '../../dist/loadable-stats.json');
const { createServeRootComponent, routes } = require('../../shared/createRootComponent');
const reducer = require('../../shared/reducer');
const config = require('../../config');

const router = new Router();

router.get('/*', async (ctx, next) => {
  // 通过请求path 匹配客户端路由
  const matchedRouter = matchRoutes(routes, ctx.request.path).filter(({ match }) => match.path !== '/');
  // 没有匹配到则 next
  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) return next();
  //
  const allRequests = [];
  const allCallbacks = [];
  // 创建服务端store
  const store = createStore(reducer);
  matchedRouter.forEach(({ route }) => {
    const { loaddata } = route;
    if (!loaddata) return;
    const { request, callback } = loaddata(config.DOMAIN);
    allRequests.push(request());
    allCallbacks.push(callback);
  });

  if (allRequests.length) {
    try {
      const value = await Promise.all(allRequests);
      allCallbacks.forEach((callback, index) => {
        callback(store.dispatch, value[index]);
      });
    } catch (e) {
      console.log(__dirname, '页面在服务端发请求出错!');
    }
  }
  // 获取初始store
  const state = JSON.stringify(store.getState() || {});
  // 创建服务端dom(store状态已经改变)
  const component = createServeRootComponent(ctx.request.url, store);
  // 获取本次请求所需要的module
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['index'] });
  const jsx = extractor.collectChunks(component);
  //
  const html = renderToString(jsx);
  // 渲染
  await ctx.render('client/index.html', {
    root: html,
    script: extractor.getScriptTags(),
    link: extractor.getStyleTags(),
    state,
  });
});


module.exports = router;
