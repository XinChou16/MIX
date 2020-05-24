import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api';

Vue.config.productionTip = false

Vue.use(VueCompositionApi);

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
