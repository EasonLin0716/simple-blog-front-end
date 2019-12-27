<template>
  <div id="profile">
    <UserInfo
      :user="user"
      :isLoading="isLoading"
      @after-handle-follow="afterHandleFollow"
      @after-handle-unfollow="afterHandleUnfollow"
    />
    <UserNavTab :userId="user.id" />
    <UserPosts :posts="posts" :user="user" />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import UserPosts from '../components/UserPosts'
import { Toast } from './../utils/helpers'
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
      isLoading: false
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
          followers: user.followers,
          followings: user.followings
        }
        this.posts = posts
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
  computed: {}
}
</script>

<style scoped>
#profile {
  width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}
</style>
