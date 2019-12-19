<template>
  <div id="profile">
    <UserInfo :user="user" />
    <UserNavTab :userId="user.id" />
    <!-- TODO: 路由切換時更換組件 -->
    <UserPosts :posts="posts" :user="user" />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import UserPosts from '../components/UserPosts'
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
        id: null,
        name: '',
        avatar: '',
        introduction: '',
        isAdmin: '',
        createdAt: '',
        updatedAt: '',
        followers: [],
        followings: []
      },
      posts: []
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
