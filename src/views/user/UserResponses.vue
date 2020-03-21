<template>
  <div id="user-responses" class="user__posts">
    <UserResponsesPosts :user="user" :replies="replies" />
  </div>
</template>

<script>
import repliesAPI from '@/apis/replies'
import UserResponsesPosts from '@/components/UserResponsesPosts'
import { Toast } from '@/utils/helpers'
export default {
  name: 'UserResponses',
  components: {
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
        Toast.fire({
          icon: 'success',
          title: '無法取得回覆過的文章，請稍後再試！'
        })
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
