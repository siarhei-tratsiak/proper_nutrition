import Help from '@/views/Help.vue'
import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'
import Products from '@/views/Products.vue'
import Ration from '@/views/Ration.vue'
import Result from '@/views/Result.vue'
import Settings from '@/views/Settings.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products',
    name: 'ProductsByNutrient',
    component: Products,
    props: route => ({ nutrient_id: route.query.nutrientID })
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/ration',
    name: 'Ration',
    component: Ration
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  }
]

const router = new VueRouter({
  routes
})

export default router
