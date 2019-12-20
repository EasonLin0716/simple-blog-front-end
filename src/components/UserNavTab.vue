<template>
  <div id="links">
    <div id="link">
      <router-link :to="this.userId">Profile</router-link>
    </div>
    <div id="link">
      <router-link :to="this.userId + '/claps'">Claps</router-link>
    </div>
    <div id="link">
      <router-link :to="this.userId + '/highlights'">Highlights</router-link>
    </div>
    <div id="link">
      <router-link :to="this.userId + '/responses'">Responses</router-link>
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

#links #link {
  margin: 0 20px 10px 0;
}
</style>
