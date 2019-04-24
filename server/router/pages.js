let generateScopedName = '[local]__[hash:5]';
if (process.env.DEPLOY_ENV === 'dev') {
  generateScopedName = '[path][name]__[local]';
}

require('@babel/register')({
  ignore: [/node_modules\//, /server\/router\//, /node_modules\\/, /server\\router\\/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@loadable/babel-plugin', 'dynamic-import-node', 'add-module-exports'],
});

// less css hook
require('css-modules-require-hook')({
  extensions: ['.less', '.css'],
  processorOpts: { parser: require('postcss-less').parse },
  generateScopedName,
});

// sass css hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  processorOpts: { parser: require('postcss-scss').parse },
  generateScopedName,
});

// image compiler hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp', 'ico'],
  limit: 8000,
});

const path = require('path');
const Router = require('koa-router');
const { renderToString, renderToNodeStream } = require('react-dom/server');
const { ChunkExtractor, ChunkExtractorManager } = require('@loadable/server');
const { matchRoutes, renderRoutes } = require('react-router-config');

const statsFile = path.resolve(__dirname, '../../dist/loadable-stats.json');
const { createServeRootComponent, routes } = require('../../shared/createRootComponent');
const { createStore, arg } = require('../../shared/createStore');
const config = require('../../config');

const router = new Router();

router.get('/*', async (ctx, next) => {
  // 通过请求path 匹配客户端路由
  const matchedRouter = matchRoutes(routes, ctx.request.path).filter(({ match }) => match.path !== '/');
  // 没有匹配到则 next
  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) return next();
  //
  const allRequsts = [];
  const allCallbacks = [];
  // 创建服务端store
  const store = createStore(...arg);
  matchedRouter.forEach(({ route }) => {
    const loaddata = route.loaddata;
    if (!loaddata) return;
    const { request, callback } = loaddata(config.DOMAIN);
    allRequsts.push(request());
    allCallbacks.push(callback);
  });

  if (allRequsts.length) {
    try {
      const value = await Promise.all(allRequsts);
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
