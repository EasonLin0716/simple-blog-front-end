<template>
  <div id="user-stories">
    <UserStoriesTopInfo />
    <UserStoriesPosts
      :posts="posts"
      @after-handle-delete-post="afterHandleDeletePost"
    />
  </div>
</template>

<script>
import UserStoriesTopInfo from '../components/UserStoriesTopInfo'
import UserStoriesPosts from '../components/UserStoriesPosts'
import { Toast } from './../utils/helpers'
import usersAPI from '../apis/user'
import postsAPI from '../apis/posts'
export default {
  name: 'UserStories',
  components: { UserStoriesTopInfo, UserStoriesPosts },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    async feachStories() {
      try {
        const { data } = await usersAPI.gerUserStories()
        this.posts = data.posts
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法取得文章，請稍後再試！'
        })
      }
    },
    async afterHandleDeletePost(postId) {
      try {
        const { data } = await postsAPI.deletePost(postId)
        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '文章刪除成功！'
          })
        }
        const idx = this.posts.map(d => d.id).indexOf(+postId)
        this.posts.splice(idx, 1)
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '無法刪除文章，請稍後再試！'
        })
      }
    }
  },
  created() {
    this.feachStories()
  }
}
</script>

<style scoped>
#user-stories {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 64px 64px;
}
</style>
