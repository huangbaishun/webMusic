import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import FastClick from 'fastclick'

Vue.config.productionTip = false

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
