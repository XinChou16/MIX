> 20200819

## vue-cli 多页面打包配置

`vue.config.js`配置

```js
module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
    },
    subPage1: {
      entry: "src/main2.js",
      template: "public/index2.html",
      customParameter: "enable",
    },
  }
};
```

## Reference

[vue-cli-docs](https://cli.vuejs.org/zh/config/#pages)
