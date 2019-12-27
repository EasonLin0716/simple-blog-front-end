<template>
  <div id="user-info">
    <div id="info">
      <div id="content">
        <h1>{{ user.name }}</h1>
        <a v-if="user.id === currentUser.id" href="#">
          <span class="badge badge-success" id="edit">Edit profile</span>
        </a>
        <form
          v-else-if="!isFollowed"
          @submit.stop.prevent="handleFollow(user.id)"
        >
          <button
            :disabled="isLoading"
            class="badge badge-success"
            type="submit"
          >
            Follow
          </button>
        </form>
        <form v-else @submit.stop.prevent="handleUnfollow(user.id)">
          <button
            :disabled="isLoading"
            class="badge badge-success"
            type="submit"
          >
            following
          </button>
        </form>
        <p>{{ user.introduction }}</p>
      </div>
      <div>
        <img :src="user.avatar" alt="avatar" />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
/* eslint-disable */
import { emptyImageFilter } from './../utils/mixins'
import userAPI from './../apis/user'
import { mapState } from 'vuex'
export default {
  name: 'UserInfo',
  mixins: [emptyImageFilter],
  data() {
    return {
      isFollowed: null
      // TODO: 觀察使用者是否被登入者追蹤
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean
    }
  },
  methods: {
    handleFollow(userId) {
      this.currentUser.followingUserId.push(this.user.id)
      this.$emit('after-handle-follow', userId)
    },
    handleUnfollow(userId) {
      this.currentUser.followingUserId.splice(
        this.currentUser.followingUserId.indexOf(this.user.id),
        1
      )
      this.$emit('after-handle-unfollow', userId)
    },
    calcIsFollowed() {
      this.isFollowed = this.currentUser.followingUserId.includes(this.user.id)
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  beforeUpdate() {
    this.calcIsFollowed()
  }
}
</script>
<style scoped>
#info {
  display: flex;
  align-items: center;
}

#info #content {
  padding-right: 40px;
}

h1 {
  display: inline;
  margin-right: 16px;
}

#edit {
  padding: 2px 8px;
  font-size: 14.5px;
}

img {
  border-radius: 50%;
  width: 128px;
  height: 128px;
}
</style>
