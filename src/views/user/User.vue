<template>
  <div id="profile" class="user__posts">
    <UserPosts
      :posts="posts"
      :user="user"
      :clapCount="clapCount"
      @after-handle-bookmark="afterHandleBookmark"
      @after-handle-unbookmark="afterHandleUnbookmark"
      @after-handle-clap="afterHandleClap"
    />
  </div>
</template>

<script>
import replyAPI from '@/apis/replies'
import UserPosts from '@/components/UserPosts'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'User',
  components: {
    UserPosts
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      clapCount: 0,
      clapTimer: null
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
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
    },
    async afterHandleClap(postId) {
      if (this.clapTimer) {
        clearTimeout(this.clapTimer)
      }
      const postIdArray = this.posts.map(d => d.id)
      const ind = postIdArray.indexOf(Number(postId))
      this.clapCount += 1
      this.posts[ind].clappedTime += 1
      this.posts[ind].clapping += 1
      this.clapTimer = setTimeout(async () => {
        try {
          this.isLoading = true
          const clapInfo = {
            clapCount: this.clapCount
          }
          const { data } = await replyAPI.clap(postId, clapInfo)
          if (data.status === 'success') {
            Toast.fire({
              icon: 'success',
              title: '鼓掌成功!!'
            })
            this.posts[ind].isClapped = true
          }
          this.clapCount = 0
          this.posts[ind].clapping = 0
          this.$forceUpdate()
          this.isLoading = false
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: '無法鼓掌，請稍後再試！'
          })
        }
      }, 2000)
    }
  }
}
</script>
