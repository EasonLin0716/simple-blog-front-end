import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/user'
import repliesAPI from '../apis/replies'
import VuexPersist from 'vuex-persist'
import { Toast } from './../utils/helpers'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    // 在 state 屬性中的資料，每個 Vue 元件都可以使用
    currentUser: {
      id: -1,
      name: '',
      email: '',
      avatar: '',
      isAdmin: false,
      clappedPostId: [],
      bookmarkedPostId: [],
      followingUserId: [],
      followerUserId: []
    },
    isAuthenticated: false
  },
  mutations: {
    // 想要修改 state 的資料時，會在 mutations 裡設定函式
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    pushBookmarkedPostId(state, postId) {
      state.currentUser.bookmarkedPostId.push(+postId)
    },
    removeBookmarkedPostId(state, postId) {
      const idx = state.currentUser.bookmarkedPostId.indexOf(+postId)
      state.currentUser.bookmarkedPostId.splice(idx, 1)
    },
    pushFollowingUserId(state, userId) {
      state.currentUser.followingUserId.push(userId)
    },
    deleteFollowingUserId(state, userId) {
      state.currentUser.followingUserId.splice(
        state.currentUser.followingUserId.indexOf(userId),
        1
      )
    }
  },
  actions: {
    // 設定其他的非同步函式，例如發送 API 請求等等
    async addBookmark({ commit }, postId) {
      try {
        const { data, statusText } = await repliesAPI.addBookmark(postId)
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '加入書籤成功'
          })
        }
        commit('pushBookmarkedPostId', postId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入書籤，請稍後再試'
        })
      }
    },
    async deleteBookmark({ commit }, postId) {
      try {
        const { data } = await repliesAPI.deleteBookmark(postId)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '移除書籤成功'
          })
        }
        commit('removeBookmarkedPostId', postId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法移除書籤，請稍後再試'
        })
      }
    },
    async follow({ commit }, userId) {
      try {
        const { data } = await usersAPI.follow(userId)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '追蹤成功！'
          })
        }
        commit('pushFollowingUserId', userId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤，請稍後再試！'
        })
      }
    },
    async unfollow({ commit }, userId) {
      try {
        const { data } = await usersAPI.unfollow(userId)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '退追成功！'
          })
        }
        commit('deleteFollowingUserId', userId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法退追，請稍後再試！'
        })
      }
    },
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await usersAPI.getCurrentUser()
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          avatar: data.avatar,
          introduction: data.introduction,
          isAdmin: data.isAdmin,
          clappedPostId: data.clappedPostId,
          bookmarkedPostId: data.bookmarkedPostId,
          followingUserId: data.followingUserId,
          followerUserId: data.followerUserId
        })
        return true
      } catch (error) {
        return false
      }
    }
  },
  modules: {}
})
