const Router = require('koa-router');

const router = new Router();

router.post('/test', async (ctx, next) => {
  ctx.state = 200;
  ctx.body = `I am fine ! env:${process.env.DEPLOY_ENV}`;
  return next();
});

module.exports = router;
