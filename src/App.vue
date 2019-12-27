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

form {
  margin: 0;
  padding: 0;
  display: inline;
}

button,
input[type='submit'],
input[type='reset'] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
