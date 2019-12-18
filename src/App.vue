<template>
  <div id="simple-blog">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
.icon {
  width: 25px;
  height: 25px;
  display: inline-block;
}
</style>
