

exports.rules = `
# 1. 替换 hosts
​
www.qq.com 127.0.0.1:5500
​
# 2. 静态代理
​
//www.qq.com/test localhost:5500/dev-helper
​
# 3. 请求转发
​
//baidu.com //qq.com
​
# 4. 注入HTML、CSS、JS
​
weibo.com localhost:5500/dev-helper/index.html
​
# youku.com jsAppend://{inject-study.js}
weibo.com jsPrepend://{inject-study.js}
​
youku.com log://{yk.js}00
`;
