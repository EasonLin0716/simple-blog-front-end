<template>
  <div>
    <h1>POSTS</h1>
    <h2 v-for="post in posts" :key="post.id">{{ post.title }}</h2>
  </div>
</template>

<script>
/* eslint-disable */
import postAPI from './../apis/posts'
export default {
  components: {},
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    /* eslint-disable */
    async fetchPosts() {
      try {
        const response = await postAPI.getPosts()
        const { data } = response
        this.posts = data.posts
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
