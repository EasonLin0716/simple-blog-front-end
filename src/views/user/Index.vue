<template>
  <div>
    <div class="box-mid">
      <UserInfo
        :user="user"
        @after-handle-follow="afterHandleFollow"
        @after-handle-unfollow="afterHandleUnfollow"
      />
      <UserNavTab :userId="user.id" />
      <router-view :user="user" :posts="posts"></router-view>
    </div>
    <AppPageFooter />
  </div>
</template>

<script>
import userAPI from '@/apis/user'
import UserInfo from '@/components/UserInfo'
import UserNavTab from '@/components/UserNavTab'
import AppPageFooter from '@/components/AppPageFooter'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'Index',
  components: { UserInfo, UserNavTab, AppPageFooter },
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
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    next()
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
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試！'
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
  }
}
</script>
