<template>
  <div>
    <nav class="d-flex justify-content-between align-items-center" id="navbar">
      <div class="col-left pl-4">
        <a href="#"><img src="https://fakeimg.pl/112x22/" alt="logo"/></a>
      </div>
      <div class="col-right d-flex justify-content-between align-items-center">
        <font-awesome-icon icon="search" />
        <font-awesome-icon :icon="['far', 'bell']" />
        <button class="btn btn-default">Upgrade</button>
        <a href="#"><img src="https://fakeimg.pl/32x32/" alt="profile"/></a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
