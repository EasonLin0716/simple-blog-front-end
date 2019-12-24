<template>
  <div id="user-responses">
    <UserInfo :user="user" />
    <UserNavTab :userId="user.id" />
    <UserResponsesPosts :user="user" :replies="replies" />
  </div>
</template>

<script>
import repliesAPI from '../apis/replies'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import UserResponsesPosts from '../components/UserResponsesPosts'
export default {
  name: 'User',
  components: {
    UserInfo,
    UserNavTab,
    UserResponsesPosts
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
      replies: []
    }
  },
  methods: {
    async getUserReplies(userId) {
      try {
        const { data, statusText } = await repliesAPI.getUserReplies({
          userId
        })
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        const { user, replies } = data
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
        this.replies = replies
      } catch (error) {
        console.error(error)
      }
    }
  },
  created() {
    const { id: userId } = this.$route.params
    this.getUserReplies(userId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: userId } = to.params
    this.getUserReplies(userId)
    next()
  }
}
</script>

<style scoped>
#user-responses {
  width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}
</style>
