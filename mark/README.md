
## webpack 

- [build a mini webpack](https://github.com/ronami/minipack/blob/master/src/minipack.js)

## 1117

webpack cache

- https://javascript.plainenglish.io/how-to-improve-webpack-performance-7637db26fa5f
- https://mp.weixin.qq.com/mp/homepage?__biz=Mzg3OTYwMjcxMA==&hid=1&sn=1e3ac0a294fa453f3f8cda212d16b01d&scene=18
- noParse: https://v4.webpack.js.org/configuration/module/
- miniChunk配置：https://imweb.io/topic/5b66dd601402769b60847149
- webpack配置：https://developpaper.com/some-configuration-optimization-and-solutions-of-webpack/

webpack module配置

```js
    module: {
        // /(vue|vuex)$/,
        noParse: (content) => {
            if (
                /node_modules/.test(content) &&
                /vue\/dist|vuex\/dist/.test(content)
            ) {
                // node_modules/vue/dist/vue.runtime.esm.js
                // node_modules/vue/dist/vue.runtime.common.js
                // node_modules/vue/dist/vue.runtime.common.dev.js
                // node_modules/vuex/dist/vuex.esm.js
                // return true;
            }
            return false;
        },
    }
```