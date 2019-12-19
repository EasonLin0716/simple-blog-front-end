<template>
  <div id="links">
    <div id="link" v-for="tab in tabs" :key="tab.id">
      <router-link :to="tab.path">{{ tab.title }}</router-link>
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
    return {
      tabs: [
        {
          id: 1,
          title: 'Profile',
          path: `/users/${this.userId}`
        },
        {
          id: 2,
          title: 'Claps',
          path: `/users/${this.userId}/claps`
        },
        {
          id: 3,
          title: 'Highlights',
          path: `/users/${this.userId}/highlights`
        },
        {
          id: 4,
          title: 'Responses',
          path: `/users/${this.userId}/responses`
        }
      ]
    }
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
