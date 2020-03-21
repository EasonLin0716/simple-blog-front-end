<template>
  <div id="simple-blog">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'

export default {
  components: {
    AppNavbar
  },
  created() {
    console.log('Welcome to Simple Blog!')
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.css';
@import './assets/sass/_variables.scss';
@import './assets/sass/style.scss';
</style>
