
# Whistle

前端 web 代理调试工具


## 匹配模式

正则匹配

通配符匹配
$1表示匹配到的第一个 `*`内容，$2为匹配到的第二个`*`内容

```shell
^www.example.com/test/*** referer://http://www.test.com/$1
^**.aaa.com/static/**/js/main.js /Users/user/static/$2/js/main.js
```

## 操作值

模板字符串，可以读取请求的一些信息

