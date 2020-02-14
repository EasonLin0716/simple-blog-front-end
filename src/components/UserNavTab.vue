<template>
  <div id="links">
    <div class="link">
      <router-link :to="'/users/' + this.userId">Profile</router-link>
    </div>
    <div class="link">
      <router-link :to="'/users/' + this.userId + '/claps'">Claps</router-link>
    </div>
    <div class="link">
      <router-link :to="'/users/' + this.userId + '/highlights'"
        >Highlights</router-link
      >
    </div>
    <div class="link">
      <router-link :to="'/users/' + this.userId + '/responses'"
        >Responses</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
#links {
  display: flex;
  border-bottom: 1px solid rgb(200, 200, 200);
}

.link {
  margin: 0 20px 10px 0;
}
</style>
