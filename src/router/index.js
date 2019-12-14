import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Posts from '../views/Posts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
