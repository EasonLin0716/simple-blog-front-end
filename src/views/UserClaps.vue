<template>
  <div id="user-claps">
    <div id="box">
      <UserInfo :user="user" />
      <UserNavTab :userId="user.id" />
      <UserClapsPosts :posts="posts" :user="user" />
    </div>
    <PageFooter />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import PageFooter from '../components/PageFooter'
import UserClapsPosts from '../components/UserClapsPosts'
import { Toast } from './../utils/helpers'
export default {
  name: 'UserClaps',
  components: {
    UserInfo,
    UserNavTab,
    UserClapsPosts,
    PageFooter
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
      posts: []
    }
  },
  methods: {
    async fetchUserClaps(userId) {
      try {
        const { data, statusText } = await userAPI.getClaps({
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
        Toast.fire({
          icon: 'error',
          title: '無法取得鼓掌資訊，請稍後再試！'
        })
      }
    }
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUserClaps(userId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: userId } = to.params
    this.fetchUserClaps(userId)
    next()
  }
}
</script>

<style scoped>
#box {
  width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}
</style>
