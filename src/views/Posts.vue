<template>
  <div id="posts">
    <PacmanLoader v-if="isRendering" />
    <template v-else>
      <PostsTop :posts="posts" />
      <hr />
      <div class="row" id="contents">
        <PostsDownLeft
          :posts="posts"
          :isLoading="isLoading"
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
      posts: [
        {
          id: 1,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: '',
          bookmarkId: []
        },
        {
          id: 2,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: '',
          bookmarkId: []
        },
        {
          id: 3,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: '',
          bookmarkId: []
        },
        {
          id: 4,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: '',
          bookmarkId: []
        },
        {
          id: 5,
          cover: '',
          title: '',
          content: '',
          authorId: 0,
          author: '',
          monthDay: '',
          readTime: '',
          bookmarkId: []
        }
      ],
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
    this.fetchPosts()
  },
  methods: {
    /* eslint-disable */
    async fetchPosts() {
      try {
        const response = await postAPI.getPosts()
        const { data } = response
        this.posts = data.posts
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
        console.error(error)
      }
    },
    async afterHandleBookmark(postId) {
      try {
        this.isLoading = true
        const { data } = await replyAPI.addBookmark(postId)
        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '加入書籤成功'
          })
        }
        const idx = this.posts.map(d => d.id).indexOf(+postId)
        this.posts[idx].isBookmarked = true
        this.isLoading = false
      } catch (error) {
        console.error(error)
      }
    },
    async afterHandleUnbookmark(postId) {
      try {
        this.isLoading = true
        const { data } = await replyAPI.deleteBookmark(postId)
        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '移除書籤成功'
          })
        }
        const idx = this.posts.map(d => d.id).indexOf(+postId)
        this.posts[idx].isBookmarked = false
        this.isLoading = false
      } catch (error) {
        console.error(error)
      }
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
