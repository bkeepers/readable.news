import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import ItemDetail from './views/ItemDetail.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    {
      path: '/item/:id',
      component: ItemDetail,
      name: 'item',
      props: true,
      meta: { bg: 'white' }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
