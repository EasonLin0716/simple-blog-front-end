import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Posts from '../views/Posts.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/posts'
  },
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
    path: '/posts/create',
    name: 'post-create',
    component: () => import('../views/PostCreate.vue')
  },
  {
    path: '/posts/:id/edit',
    name: 'post-edit',
    component: () => import('../views/PostEdit.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/posts/:id/replies',
    name: 'replies',
    component: () => import('../views/Reply.vue')
  },
  {
    path: '/users/stories/public',
    name: 'user-stories',
    component: () => import('../views/UserStories')
  },
  {
    path: '/users/stories/drafts',
    name: 'user-drafts',
    component: () => import('../views/UserDrafts')
  },
  {
    path: '/users/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/claps',
    name: 'user-claps',
    component: () => import('../views/UserClaps.vue')
  },
  {
    path: '/users/:id/highlights',
    name: 'user-highlights',
    component: () => import('../views/UserHighlights.vue')
  },
  {
    path: '/users/:id/responses',
    name: 'user-responses',
    component: () => import('../views/UserResponses.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('../views/UserFollowings.vue')
  },
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('../views/UserFollowers.vue')
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated

  console.log('isAuthenticated: ', +isAuthenticated)

  if (isAuthenticated) {
    store.dispatch('fetchCurrentUser')
  }
  next()
})

export default router
