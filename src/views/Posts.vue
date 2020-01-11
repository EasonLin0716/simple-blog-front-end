<template>
  <div id="posts">
    <PostsTop :posts="posts" />
    <hr />
    <div class="row" id="contents">
      <PostsDownLeft :posts="posts" />
      <PostsDownRight :newPosts="newPosts" :popularPosts="popularPosts" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import postAPI from './../apis/posts'
import PostsTop from './../components/PostsTop'
import PostsDownLeft from './../components/PostsDownLeft'
import PostsDownRight from './../components/PostsDownRight'
export default {
  name: 'Posts',
  data() {
    return {
      posts: [
        {
          id: 1,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: ''
        },
        {
          id: 2,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: ''
        },
        {
          id: 3,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: ''
        },
        {
          id: 4,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: ''
        },
        {
          id: 5,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: ''
        }
      ],
      newPosts: [],
      popularPosts: []
    }
  },
  components: { PostsTop, PostsDownLeft, PostsDownRight },
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
        this.newPosts = data.newPosts
        this.popularPosts = data.popularPosts
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}

#posts {
  margin: 0 auto;
  max-width: 1032px;
}
</style>
