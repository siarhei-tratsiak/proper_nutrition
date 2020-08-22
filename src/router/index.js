import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Result from '@/views/Result.vue'
import List from '@/views/List.vue'
import Product from '@/views/Product.vue'
import Ration from '@/views/Ration.vue'
import Settings from '@/views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    name: 'List',
    component: List
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
  }
]

const router = new VueRouter({
  routes
})

export default router
