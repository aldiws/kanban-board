import Vue from 'vue'
import biangPanas from 'vuefire'
import App from './App'
import router from './router'

Vue.use(biangPanas)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
