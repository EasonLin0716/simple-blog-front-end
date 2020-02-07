<template>
  <div id="posts">
    <PacmanLoader v-if="isRendering" />
    <template v-else>
      <PostsTop :posts="posts" />
      <hr />
      <div class="row" id="contents">
        <PostsDownLeft
          :posts="posts"
          @after-handle-bookmark="afterHandleBookmark"
          @after-handle-unbookmark="afterHandleUnbookmark"
        />
        <PostsDownRight
          :newPosts="newPosts"
          :popularPosts="popularPosts"
          :isAuthenticated="isAuthenticated"
          :readingPosts="readingPosts"
        />
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import postAPI from './../apis/posts'
import replyAPI from './../apis/replies'
import PacmanLoader from './../components/PacmanLoader'
import PostsTop from './../components/PostsTop'
import PostsDownLeft from './../components/PostsDownLeft'
import PostsDownRight from './../components/PostsDownRight'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import Swal from 'sweetalert2'
export default {
  name: 'Posts',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    readingPosts: function() {
      if (this.isAuthenticated) {
        const readingPosts = []
        this.posts.map(d => {
          if (d.bookmarkId.indexOf(this.currentUser.id) !== -1) {
            readingPosts.push(d)
          }
        })
        return readingPosts.slice(0, 4)
      } else {
        return []
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isRendering: true,
      offset: 0,
      posts: [],
      newPosts: [],
      popularPosts: []
    }
  },
  components: {
    PostsTop,
    PostsDownLeft,
    PostsDownRight,
    PacmanLoader
  },
  created() {
    if (!this.isAuthenticated) {
      Toast.fire({
        icon: 'info',
        title: '感謝您的使用！敬請登入來使用目前完成的所有功能！'
      })
    }
    this.fetchPosts()
  },
  methods: {
    /* eslint-disable */
    async fetchPosts() {
      try {
        const response = await postAPI.getPosts()
        const { data } = response
        data.posts.forEach(post => {
          this.posts.push(post)
        })
        if (this.isAuthenticated) {
          this.posts.map(d => {
            d.isBookmarked = this.currentUser.bookmarkedPostId.includes(d.id)
          })
        }
        this.newPosts = data.newPosts
        this.popularPosts = data.popularPosts
        this.isRendering = false
      } catch (error) {
        this.isRendering = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得文章，請稍後再試！'
        })
      }
    },
    afterHandleBookmark(postId) {
      if (!this.isAuthenticated) {
        Toast.fire({
          icon: 'info',
          title: '請登入來使用此功能！'
        })
        return
      }
      this.$store.dispatch('addBookmark', postId)
      const idx = this.posts.map(d => d.id).indexOf(+postId)
      this.posts[idx].isBookmarked = true
    },
    afterHandleUnbookmark(postId) {
      this.$store.dispatch('deleteBookmark', postId)
      const idx = this.posts.map(d => d.id).indexOf(+postId)
      this.posts[idx].isBookmarked = false
    }
  }
}
</script>

<style scoped>
#posts {
  margin: 0 auto;
  max-width: 1032px;
}
</style>
