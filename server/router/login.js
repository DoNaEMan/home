require('@babel/register')({
  ignore: [/node_modules\//, /server\/router\//, /node_modules\\/, /server\\router\\/],
  presets: ['@babel/preset-env'],
  plugins: ['add-module-exports'],
});

const Router = require('koa-router');
const axios = require('../../utils/axios').default;

const router = new Router();

router.post('/login', async (ctx, next) => {
  let res = null;
  try {
    res = await axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      success: true,
      value: res.data
    };
    console.log(res);
  } catch ({ config = {} }){
    ctx.status = 200;
    ctx.body = {
      success: false,
      errorMsg: config.data || 'system error'
    };
  }
  return next();
});

module.exports = router;
