import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

//Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.use(VueAxios,axios)
Vue.use(ElementUI)
new Vue({
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app')
