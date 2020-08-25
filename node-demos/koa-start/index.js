const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: 'ok',
    data: {
      foo: 1
    }
  };

  const keys = [
    // 'header',
    // 'headers'
    'method',
    'url',
    'originalUrl',
    'origin',
    'href',
    'path',
    'query',
    'querystring',
    'host',
    'hostname',
    'fresh',
    'stale',
    // 'socket',
    'protocol',
    'secure',
    'ip',
    'ips',
    'subdomains'
  ];

  keys.forEach(key => {
    const getVal = () => {
      let val = ctx[key];
      return typeof val === 'object' ? JSON.stringify(val, null, 2) : val;
    }
    console.log(`${key}: ${getVal()}`);
  });
});


app.use( router.routes() );
app.use( router.allowedMethods() );

app.listen(3000);
