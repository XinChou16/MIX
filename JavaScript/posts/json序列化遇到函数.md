
## 背景

前端与客户端进行通信时，必须将参数进行 JSON.stringify，但这样一来，参数中的函数在 stringify后会丢失

## 解决

1、可以将参数与客户端进行协商，不尽兴 stringify 处理
2、前端传递参数前将函数参数提前转为字符串，客户端再进行转义

JSON中不允许将函数作为对象值：
```js
const params = {
  num: 12,
  finished: false,
  success: function() {
    console.log('success');
  }
}
params.success = params.success.toString();
const paramsJson = JSON.stringify(params);
```

