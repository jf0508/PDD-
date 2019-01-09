// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import lyTab from 'ly-tab'
import store from './store'
import MintUI from 'mint-ui'

import 'vant/lib/index.css';
import 'mint-ui/lib/style.css'

Vue.use(Vant);
Vue.use(MintUI)
Vue.use(lyTab)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App)
 
})
