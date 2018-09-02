// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {sync} from 'vuex-router-sync'
sync(store, router)

import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

require('vue2-animate/dist/vue2-animate.min.css')

import MapHelpers from '../src/mixins/MapHelpers'

Vue.mixin(MapHelpers)

import VuetifyConfirm from 'vuetify-confirm'
Vue.use(VuetifyConfirm)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
