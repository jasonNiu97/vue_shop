import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/MyLogin.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/MyHome.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/home') {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else if (to.path === '/login' || to.path === '/') {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
