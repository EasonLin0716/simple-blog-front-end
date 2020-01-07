<template>
  <div id="profile">
    <UserInfo
      :user="user"
      :isLoading="isLoading"
      @after-handle-follow="afterHandleFollow"
      @after-handle-unfollow="afterHandleUnfollow"
    />
    <UserNavTab :userId="user.id" />
    <UserPosts
      :posts="posts"
      :user="user"
      :isLoading="isLoading"
      :clapCount="clapCount"
      @after-handle-bookmark="afterHandleBookmark"
      @after-handle-unbookmark="afterHandleUnbookmark"
      @after-handle-clap="afterHandleClap"
    />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import replyAPI from '../apis/replies'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import UserPosts from '../components/UserPosts'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'User',
  components: {
    UserInfo,
    UserNavTab,
    UserPosts
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
        // console.error(error)
      }
    },
    async afterHandleFollow(userId) {
      this.isLoading = true
      const { data } = await userAPI.follow(userId)
      if (data.status === 'success') {
        Toast.fire({
          type: 'success',
          title: '追蹤成功！'
        })
        this.isLoading = false
      }
    },
    async afterHandleUnfollow(userId) {
      this.isLoading = true
      const { data } = await userAPI.unfollow(userId)
      if (data.status === 'success') {
        Toast.fire({
          type: 'success',
          title: '退追成功！'
        })
        this.isLoading = false
      }
    },
    async afterHandleBookmark(postId) {
      this.isLoading = true
      const { data } = await replyAPI.addBookmark(postId)
      if (data.status === 'success') {
        // TODO: 加入書籤時圖示更動
        this.posts.map(d => {
          if (d.id === +postId) {
            return (d.isBookmarked = !d.isBookmarked)
          }
        })
        Toast.fire({
          type: 'success',
          title: '加入書籤成功！'
        })
        this.isLoading = false
      }
    },
    async afterHandleUnbookmark(postId) {
      this.isLoading = true
      const { data } = await replyAPI.deleteBookmark(postId)
      if (data.status === 'success') {
        // TODO: 刪除書籤時圖示更動
        this.posts.map(d => {
          if (d.id === +postId) {
            return (d.isBookmarked = !d.isBookmarked)
          }
        })
        Toast.fire({
          type: 'success',
          title: '刪除書籤成功！'
        })
        this.isLoading = false
      }
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
        this.isLoading = true
        const clapInfo = {
          clapCount: this.clapCount
        }
        const { data } = await replyAPI.clap(postId, clapInfo)
        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '鼓掌成功!!'
          })
          this.posts[ind].isClapped = true
        }
        this.clapCount = 0
        this.posts[ind].clapping = 0
        this.$forceUpdate()
        this.isLoading = false
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

<style scoped>
#profile {
  width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}
</style>
