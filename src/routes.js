import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/item/:id',
      component: () => import('./views/ItemDetail.vue'),
      name: 'item',
      props: true,
      meta: { bg: 'white' }
    },
    {
      path: '/render/:url?',
      component: () => import('./views/Render.vue'),
      props: true,
      name: 'render'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
