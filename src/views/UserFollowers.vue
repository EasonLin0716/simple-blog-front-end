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
          icon: 'success',
          title: '無法取得追隨者，請稍後再試！'
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
    this.fetchUserClaps(userId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: userId } = to.params
    this.fetchUserClaps(userId)
    next()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>
