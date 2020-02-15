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
  }
}
</script>

<style lang="scss">
@import './assets/css/reset.css';

.box-mid {
  max-width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}

.user-stories {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 64px 64px;
}

.user-auths {
  max-width: 1028px;
  padding: 64px;
  margin: 0px auto;
  border: 1px solid #ccc;
  display: flex;
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
  width: 24px;
  height: 24px;
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

.size-small {
  width: 32px;
  height: 32px;
}

.size-mid {
  width: 40px;
  height: 40px;
}

.clap {
  font-size: 25px;
  cursor: pointer;
}

@media screen and (max-width: 992px) {
  .auth-pic {
    display: none;
  }
}
</style>
