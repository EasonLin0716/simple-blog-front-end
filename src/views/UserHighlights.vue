<template>
  <div id="user-highlights">
    <UserInfo :user="user" />
    <UserNavTab :userId="user.id" />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import { Toast } from './../utils/helpers'
export default {
  name: 'UserHighlights',
  components: {
    UserInfo,
    UserNavTab
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
      }
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
        const { user } = data
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
      } catch (error) {
        Toast.fire({
          icon: 'success',
          title: '無法取得重點標記文章，請稍後再試！'
        })
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
#user-highlights {
  width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}
</style>
