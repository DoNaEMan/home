const Router = require('koa-router');

const router = new Router();

router.post('/test', async (ctx, next) => {
  ctx.state = 200;
  ctx.body = 'I am fine!?' + process.NODE_ENV;
  return next();
});

module.exports = router;
