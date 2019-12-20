import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Posts from '../views/Posts.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/claps',
    name: 'users',
    component: () => import('../views/UserClaps.vue')
  },
  {
    path: '/users/:id/highlights',
    name: 'users',
    component: () => import('../views/UserHighlights.vue')
  },
  {
    path: '/users/:id/responses',
    name: 'users',
    component: () => import('../views/UserResponses.vue')
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
