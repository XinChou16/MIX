const Koa = require('koa')
const app = new Koa();

app.keys = ['im a newer secret', 'i like turtle'];

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  ctx.cookies.set('name', 'Evan', { signed: true });
});

app.use(async (ctx, next) => {
  ctx.body = 'Hello';
});

app.listen(3000, () => {
  console.log( 'listening at 3000')
});

app.on('error', (err, ctx) => {
  console.log('server error', err, ctx);
});

console.log(app)
