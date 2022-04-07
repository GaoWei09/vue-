// import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../views/Manager.vue'),
    
  },
  {
    path: '/people',
    name: 'people',
    component: () => import('../views/People.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
