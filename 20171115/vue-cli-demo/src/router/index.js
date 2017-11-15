import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'Goods' }
    },
    {
      path: '/:id',
      name: 'Goods',
      component: Goods
    }
  ]
})
