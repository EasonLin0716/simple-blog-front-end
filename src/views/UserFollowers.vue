<template>
  <div id="user-followers" class="box-mid">
    <UserInfo
      :user="user"
      @after-handle-follow="afterHandleFollow"
      @after-handle-unfollow="afterHandleUnfollow"
    />
    <UserNavTab :userId="user.id" />
    <UserFollowerList
      :userName="user.name"
      :userId="user.id"
      :followers="user.followers"
    />
  </div>
</template>

<script>
import userAPI from '../apis/user'
import UserInfo from '../components/UserInfo'
import UserNavTab from '../components/UserNavTab'
import UserFollowerList from '../components/UserFollowerList'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'UserFollowers',
  components: {
    UserInfo,
    UserNavTab,
    UserFollowerList
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
    async getUserFollowers(userId) {
      try {
        const { data, statusText } = await userAPI.getUserFollowings({
          userId
        })
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        this.user = {
          ...data.user,
          followers: data.user.Followers,
          followings: data.user.Followings
        }
      } catch (error) {
        Toast.fire({
          icon: 'success',
          title: '無法取得追蹤者，請稍後再試！'
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
    }
  },
  created() {
    const { id: userId } = this.$route.params
    this.getUserFollowers(userId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: userId } = to.params
    this.getUserFollowers(userId)
    next()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>
