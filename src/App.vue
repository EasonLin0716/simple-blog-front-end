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

ul {
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
}

p {
  font-size: 16px;
}

.icon {
  width: 25px;
  height: 25px;
  display: inline-block;
}

#bookmark {
  cursor: pointer;
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
