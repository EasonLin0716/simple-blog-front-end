<template>
  <div id="signin">
    <img src="https://fakeimg.pl/214x550/" alt="pic" />
    <form class="w-100 px-2" @submit.prevent.stop="handleSubmit">
      <h1>Sign in</h1>
      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
        />
      </div>
      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button
        :disabled="isProcessing"
        class="btn btn-lg btn-dark btn-block mb-3"
        type="submit"
      >
        Continue
      </button>
      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2019-2020 Created without any commercial purposes by Eason Lin
      </p>
    </form>
    <img src="https://fakeimg.pl/214x550/" alt="pic" />
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'
export default {
  name: 'SignIn',
  data() {
    return {
      isProcessing: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })
        const { data } = response
        localStorage.setItem('token', data.token)
        // 將資料傳入 Vuex
        this.$store.commit('setCurrentUser', data.user)
        Toast.fire({
          icon: 'success',
          title: '登入成功！'
        })
        this.$router.push('/posts')
      } catch (error) {
        this.password = ''
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入的帳號密碼錯誤'
        })
      }
    }
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
#signin {
  width: 1028px;
  padding: 64px;
  margin: 0px auto;
  border: 1px solid #ccc;
  display: flex;
}
</style>
