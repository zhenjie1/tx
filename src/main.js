import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/config/indexDBConfig'
import '@/config/socketConfig'

import '@/plugins/elementUi/index'
import '@/plugins/iview/index'

// 全局引入的模版
import '@/assets/js/globalTemplate'
// 全局过滤器
import '@/assets/js/globalFilter'

import '@/assets/css/clear.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
