import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 在 state 屬性中的資料，每個 Vue 元件都可以使用
    currentUser: {
      id: -1,
      name: '',
      email: '',
      avatar: '',
      isAdmin: false
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
    }
  },
  actions: {
    // 設定其他的非同步函式，例如發送 API 請求等等
  },
  modules: {}
})
