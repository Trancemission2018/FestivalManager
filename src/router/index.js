import Vue from 'vue'
import Router from 'vue-router'
import MainMap from '../components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMap',
      component: MainMap
    }
  ]
})
