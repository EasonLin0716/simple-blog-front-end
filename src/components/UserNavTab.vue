<template>
  <div id="links">
    <div
      class="link"
      :class="
        !(
          currentRoute.includes('claps') ||
          currentRoute.includes('highlights') ||
          currentRoute.includes('responses')
        )
          ? 'chosen'
          : ''
      "
    >
      <router-link :to="'/users/' + this.userId">Profile</router-link>
    </div>
    <div class="link" :class="currentRoute.includes('claps') ? 'chosen' : ''">
      <router-link :to="'/users/' + this.userId + '/claps'">Claps</router-link>
    </div>
    <div
      class="link"
      :class="currentRoute.includes('highlights') ? 'chosen' : ''"
    >
      <router-link :to="'/users/' + this.userId + '/highlights'"
        >Highlights</router-link
      >
    </div>
    <div
      class="link"
      :class="currentRoute.includes('responses') ? 'chosen' : ''"
    >
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
  computed: {
    currentRoute: function() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
#links {
  display: flex;
  border-bottom: 1px solid rgb(200, 200, 200);
}

.link {
  padding-bottom: 10px;
  margin-right: 20px;
}

.chosen {
  border-bottom: 3px solid black;
}
</style>
