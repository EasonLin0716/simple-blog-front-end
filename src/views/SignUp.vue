<template>
  <div id="signup">
    <img src="https://fakeimg.pl/214x550/" alt="pic" class="pic" />
    <form class="w-100 px-2" @submit.stop.prevent="handleSubmit">
      <h1>Sign Up</h1>
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
        class="btn btn-lg btn-dark btn-block mb-3"
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
        &copy; 2019-2020 Created without any commercial purposes by Eason Lin
      </p>
    </form>
    <img src="https://fakeimg.pl/214x550/" alt="pic" class="pic" />
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
            icon: 'error',
            title: '發生錯誤，請重新輸入！'
          })
          this.isLoading = false
        }

        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '註冊成功，請輸入帳密登入！'
          })
          this.$router.push('/signin')
        }
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法註冊，請稍後再試！'
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
#signup {
  max-width: 1028px;
  padding: 64px;
  margin: 0px auto;
  border: 1px solid #ccc;
  display: flex;
}

@media screen and (max-width: 992px) {
  .pic {
    display: none;
  }
}
</style>
