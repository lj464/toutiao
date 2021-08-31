import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}, {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout/index.vue'),
  children: [{
      path: '', // 默认子路由
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: 'qa',
      name: 'qa',
      component: () => import('@/views/qa')
    },
    {
      path: 'video',
      name: 'video',
      component: () => import('@/views/video')
    },
    {
      path: 'my',
      name: 'my',
      component: () => import('@/views/my')
    },
    {
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article'),
      props: true
    }
  ]
}]

const router = new VueRouter({
  routes
})

export default router
