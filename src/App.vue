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

<style lang="scss">
* {
  text-align: left;
}

button:focus {
  outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

a {
  text-decoration: none;
  color: #000;
}

a:hover {
  text-decoration: none;
  color: #666;
}

ul,
input {
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
}

p {
  font-size: 16px;
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

.bg-black {
  background-color: #000;
}

.icon,
.link {
  cursor: pointer;
}

.icon-small {
  font-size: 20px;
}

.icon-mid {
  font-size: 25px;
}

#bookmark {
  width: 22px;
  height: 22px;
}

.svg-small {
  width: 20px;
  height: 20px;
}

.svg-mid {
  width: 25px;
  height: 25px;
}

.badge-success:hover {
  background: rgb(0, 75, 0);
}

.clap {
  font-size: 25px;
  cursor: pointer;
}
</style>
