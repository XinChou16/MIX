
// Vue v3
const Counter = {
  data() {
    return {
      count: 0
    }
  }
};

Vue.createApp(Counter).$mount('#app');


// globalProperties

const app = Vue.createApp(App).$mount('#app');

app.config.globalProperties.$http = () => {};




