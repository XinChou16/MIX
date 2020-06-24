
访问特定路由，返回指定信息，访问其他路由，走页面

1. 访问特定路由

```js
// nuxt.config.js
module.exports = {
  // ...
  serverMiddleware: [
    { path: '/my', handler: '~/api/api.js', prefix: false },
  ]
}

// ~/api/api.js
export default function (req, res, next) {
  // req is the Node.js http request object
  console.log('url', req.originalUrl)

  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  if (req.originalUrl.includes('my')) {
    // res.writeHead(200, { msg: 'ok' })
    res.end('OK');
  } else {
    next();
  }
}
```

2. 访问其他路由

```js
// nuxt.config.js
module.exports = {
  // ...
  router: {
    base: '/test'
  }
}
```

