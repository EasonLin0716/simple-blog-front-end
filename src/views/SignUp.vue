<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        :disabled="isLoading"
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        © 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import authsAPI from '../apis/authorization'
import { Toast } from './../utils/helpers'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isLoading: false
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        this.isLoading = true
        const form = e.target // <form></form>
        const formData = new FormData(form)
        const { data } = await authsAPI.signUp({ formData })
        if (data.status === 'error') {
          Toast.fire({
            type: 'error',
            title: '發生錯誤，請重新輸入！'
          })
          this.isLoading = false
        }

        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '註冊成功，請輸入帳密登入！'
          })
          this.$router.push('/signin')
        }
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    }
  }
}
</script>
