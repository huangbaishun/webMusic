import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
// import 'lib-flexible' 
// import Vconsole from 'vconsole'
// Vue.use(new Vconsole())

Vue.use(VueLazyload, {
  loading: require('@/assets/imgs/loading.gif')
})


if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
