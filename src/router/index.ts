import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/ResultView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductsView.vue')
  },
  {
    path: '/products',
    name: 'ProductsByNutrient',
    component: () => import('@/views/ProductsView.vue'),
    props: route => ({ nutrient_id: route.query.nutrientID })
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/ration',
    name: 'Ration',
    component: () => import('@/views/RationView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue')
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/HelpView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
