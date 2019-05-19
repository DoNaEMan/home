require('@babel/register')({
  ignore: [/node_modules\//],
  plugins: ['add-module-exports'],
});

const Router = require('koa-router');
const axios = require('../../utils/axios').default;

const router = new Router();

router.post('/login', async (ctx, next) => {
  try {
    const res = await axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      success: true,
      value: res.data
    };
  } catch (error) {
    if (error.response) {
      ctx.status = error.response.status;
      ctx.body = {
        success: false,
        errorMsg: error.response.data,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        success: false,
        errorMsg: 'system error',
      };
    }
  }
  return next();
});

module.exports = router;
