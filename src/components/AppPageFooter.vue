<template>
  <div id="page-footer" class="bg-black mt-4">
    <div class="row footer-content">
      <div class="col-4">
        <h5>Lorem, ipsum dolor.</h5>
        <p class="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos tempore
          incidunt, minima veritatis eligendi quasi tempora sequi fugiat autem
          cum?
        </p>
      </div>
      <div class="col-4">
        <h5>Make this site better</h5>
        <p class="text-muted">
          If you have any ideas of making this site better, don't hesitate to
          contact me on
          <a href="https://github.com/EasonLin0716" target="_blank">github</a>
        </p>
      </div>
      <div class="col-4">
        <h5>Lorem, ipsum dolor.</h5>
        <p class="text-muted">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum unde
          iure nam ullam eaque odio reiciendis ipsum animi laboriosam iusto.
        </p>
      </div>
    </div>
    <div
      class="d-flex justify-content-between footer-content pt-4"
      id="site-info"
    >
      <div id="col-left">
        <h4>Simple Blog</h4>
      </div>
      <div class="align-self-center">
        <span class="text-muted pl-5">
          <a href="#">About</a>
        </span>
        <span class="text-muted pl-5">
          <a href="#">Help</a>
        </span>
        <span class="text-muted pl-5">
          <a href="#">Legal</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPageFooter'
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
a:hover {
  text-decoration: underline;
}

h5 {
  margin-bottom: 12px;
}

p {
  font-size: $text-small;
}

.footer-content {
  margin: 0 auto;
  padding: 60px 0 40px 0;
  border-bottom: 1px solid #ccc;
  max-width: 1216px;
}

.footer-content * {
  color: #fff;
}

@media screen and (max-width: 720px) {
  #site-info {
    margin: 0 15px;
  }
}
</style>
