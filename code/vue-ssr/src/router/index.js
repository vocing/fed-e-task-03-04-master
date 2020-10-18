import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'

Vue.use(VueRouter)

export const createRouter = () => {
  const router = new VueRouter({
    mode: 'history', // 同构不能使用hash, 因为服务端不会识别hash, 所以这里使用history
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About'),
      },
      {
        path: '/posts',
        name: 'posts',
        component: () => import('@/pages/Posts'),
      },
      {
        path: '*',
        name: '404',
        component: () => import('@/pages/404'),
      },
    ],
  })
  return router
}
