# compare to v4

- add [subscribe](https://vuex.vuejs.org/api/#subscribe)

```js
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})

// with options
store.subscribe(handler, { prepend: true })
```

- add register.js file
