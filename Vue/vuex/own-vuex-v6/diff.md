# compare to v5

- add [dynamic-module-registeration](https://vuex.vuejs.org/guide/modules.html#dynamic-module-registration)

```js
var store = new Vuex.Store({
  state: {
    count: 0
  }
});
store.registerModule('my', {
  state: {
    num: 1
  }
})
console.log(store);

store.unRegisterModule('my')
```
