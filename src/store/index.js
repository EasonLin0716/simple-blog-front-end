import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/user'
import VuexPersist from 'vuex-persist'

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
    }
  },
  actions: {
    // 設定其他的非同步函式，例如發送 API 請求等等
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
