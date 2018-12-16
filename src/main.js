// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Refresh from './components/refresh';
import VueJsonp from 'vue-jsonp'

Vue.config.productionTip = false;
Vue.use(VueJsonp);

console.log(Object.getOwnPropertyNames(Vue));
console.log(Vue.set.toString())

Vue.prototype.$showRefresh = Refresh;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
