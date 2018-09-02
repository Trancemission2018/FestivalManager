import Vue from 'vue'
import Router from 'vue-router'
import MainMap from '../components/Main.vue'
import EditMap from '../components/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/edit',
      name: 'EditMap',
      component: EditMap
    },
    {
      path: '/monitor',
      name: 'MainMap',
      component: MainMap
    },
  ]
})
