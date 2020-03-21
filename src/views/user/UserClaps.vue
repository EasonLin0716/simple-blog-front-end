<template>
  <div id="user-claps" class="user__posts">
    <UserClapsPosts :posts="posts" :user="user" />
  </div>
</template>

<script>
import userAPI from '@/apis/user'
import UserClapsPosts from '@/components/UserClapsPosts'
import { Toast } from '@/utils/helpers'
export default {
  name: 'UserClaps',
  components: {
    UserClapsPosts
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
  created() {
    const { id: userId } = this.$route.params
    this.fetchUserClaps(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params
    this.fetchUserClaps(userId)
    next()
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
  }
}
</script>
