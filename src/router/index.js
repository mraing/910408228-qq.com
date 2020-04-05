import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Menus3 from '@/views/menus-3/Menus3'

Vue.use(Router)

export const defaultRouter = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    hidden: true,
    children: [
      {
        path: 'menus-3',
        component: Menus3
      }
    ]
  }
]

export default new Router({
  routes: defaultRouter
})
