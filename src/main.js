import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import toast from './components/common/toast/index'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus =new Vue()
// Vue.prototype.debounce=new Vue()

// 安装toast
Vue.use(toast)
Vue.use(LazyLoad)
FastClick.attach(document.body)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
