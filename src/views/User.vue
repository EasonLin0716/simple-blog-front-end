<template>
  <div id="profile">
    <div class="box-mid">
      <UserInfo
        :user="user"
        @after-handle-follow="afterHandleFollow"
        @after-handle-unfollow="afterHandleUnfollow"
      />
      <UserNavTab :userId="user.id" />
      <UserPosts
        :posts="posts"
        :user="user"
        :clapCount="clapCount"
        @after-handle-bookmark="afterHandleBookmark"
        @after-handle-unbookmark="afterHandleUnbookmark"
        @after-handle-clap="afterHandleClap"
      />
    </div>
    <AppPageFooter />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import replyAPI from '../apis/replies'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import UserPosts from '../components/UserPosts'
import AppPageFooter from '../components/AppPageFooter'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'User',
  components: {
    UserInfo,
    UserNavTab,
    UserPosts,
    AppPageFooter
  },
  data() {
    return {
      user: {
        id: 0,
        name: '',
        avatar: '',
        introduction: '',
        isAdmin: '',
        createdAt: '',
        updatedAt: '',
        followers: [],
        followings: []
      },
      posts: [],
      isLoading: false,
      clapCount: 0,
      clapTimer: null
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data, statusText } = await userAPI.get({
          userId
        })
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        const { user, posts } = data
        this.user = {
          ...this.user,
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          introduction: user.introduction,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          followers: user.Followers,
          followings: user.Followings
        }
        this.posts = posts
        if (this.isAuthenticated) {
          const bookmarkedId = this.currentUser.bookmarkedPostId
          for (let i = 0; i < this.posts.length; i++) {
            this.posts[i].isBookmarked =
              bookmarkedId.indexOf(this.posts[i].id) > -1
          }
          const clappedId = this.currentUser.clappedPostId
          for (let i = 0; i < this.posts.length; i++) {
            this.posts[i].isClapped = clappedId.indexOf(this.posts[i].id) > -1
          }
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試！'
        })
      }
    },
    afterHandleFollow(userId) {
      if (!this.isAuthenticated) {
        Toast.fire({
          icon: 'info',
          title: '請登入來使用此功能！'
        })
        return
      }
      this.$store.dispatch('follow', userId)
    },
    afterHandleUnfollow(userId) {
      if (!this.isAuthenticated) {
        Toast.fire({
          icon: 'info',
          title: '請登入來使用此功能！'
        })
        return
      }
      this.$store.dispatch('unfollow', userId)
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
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: userId } = to.params
    this.fetchUser(userId)
    next()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>
