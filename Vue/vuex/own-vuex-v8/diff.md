# Compare to v7

- Add [modules](https://vuex.vuejs.org/api/#modules)

**API**

```TS
var store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  /* 模块 */
  modules: {
    moduleA: {
      state,
      namespaced,
      mutations,
      actions,
      getters,
      modules
    }
  }
});
```
