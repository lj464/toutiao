
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/styles/index.css'
import Vue from 'vue'
import Vant from 'vant'
import 'amfe-flexible'
import './utils/dayjs'

import 'vant/lib/index'

import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
