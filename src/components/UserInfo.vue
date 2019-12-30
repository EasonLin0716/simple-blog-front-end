<template>
  <div id="user-info">
    <div id="info">
      <div id="content">
        <h1>{{ user.name }}</h1>
        <template v-if="isAuthenticated">
          <router-link :to="'/users/edit'" v-if="user.id === currentUser.id">
            <span class="badge badge-success" id="edit">Edit profile</span>
          </router-link>
          <button
            v-else-if="!isFollowed"
            :disabled="isLoading"
            class="badge badge-success"
            v-on:click="handleFollow(user.id)"
          >
            Follow
          </button>
          <button
            v-else
            :disabled="isLoading"
            class="badge badge-success"
            v-on:click="handleUnfollow(user.id)"
          >
            following
          </button>
        </template>
        <p>{{ user.introduction }}</p>
      </div>
      <div>
        <img :src="user.avatar" alt="avatar" />
      </div>
    </div>
    <div id="follow">
      <router-link :to="'/users/' + this.user.id + '/followings'">
        <span v-if="user.followings.length"
          >{{ user.followings.length }} Following</span
        >
      </router-link>
      <router-link :to="'/users/' + this.user.id + '/followers'">
        <span v-if="user.followers.length"
          >{{ user.followers.length }} Followers</span
        >
      </router-link>
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
    return {}
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
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    isFollowed: function() {
      return this.currentUser
        ? this.currentUser.followingUserId.includes(this.user.id)
        : false
    }
  }
}
</script>
<style scoped>
#info {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

#follow span {
  margin-right: 10px;
}
</style>
