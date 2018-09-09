import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeCN from '@/components/HomeCN'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cn',
      name: 'HomeCN',
      component: HomeCN
    }
  ]
})
