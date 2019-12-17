<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>
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
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>
      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
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
            type: 'warning',
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
        this.$router.push('/posts')
      } catch (error) {
        this.password = ''
        this.isProcessing = false
        Toast.fire({
          type: 'warning',
          title: '請確認您輸入的帳號密碼錯誤'
        })
      }
    }
  }
}
</script>
