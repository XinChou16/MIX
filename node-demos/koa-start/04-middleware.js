const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// multiple middleware
router.get(
  '/about',
  (ctx, next) => {
    ctx.user = { name: '1', addr: 2 };
    next();
  },
  (ctx, next) => {
    console.log('ctx.user is %o', ctx.user);
  }
);

app.use( router.routes() );
app.use( router.allowedMethods() );

app.listen(3000);
