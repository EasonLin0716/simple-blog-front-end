<template>
  <div id="post-user-info">
    <div id="col-left">
      <router-link :to="'/users/' + author.id">
        <img
          class="rounded-circle"
          :src="author.avatar"
          alt="avatar"
          id="avatar"
        />
      </router-link>
      <div id="info">
        <h6>
          <router-link :to="'/users/' + author.id">
            {{ author.name }}
          </router-link>
          <router-link
            to="/users/edit"
            v-if="currentUserId === author.id"
            class="badge badge-success"
            >Edit Profile</router-link
          >
          <span
            @click="handleFollow"
            v-else-if="!isFollowing"
            class="badge badge-success"
            >Follow</span
          >
          <span
            @click="handleUnfollow"
            v-else-if="isFollowing"
            class="badge badge-info"
            >Following</span
          >
        </h6>
        <span> {{ post.monthDay }}&nbsp;&bull;&nbsp;{{ post.readTime }} </span>
      </div>
    </div>
    <div id="col-right">
      <font-awesome-icon
        :icon="['fab', 'twitter']"
        class="icon icon-mid mr-1"
      />
      <font-awesome-icon
        :icon="['fab', 'facebook']"
        class="icon icon-mid mr-1"
      />
      <template v-if="!isBookmarked">
        <font-awesome-icon
          @click="handleBookmark"
          :icon="['far', 'bookmark']"
          class="icon"
          id="bookmark"
        />
      </template>
      <template v-else>
        <font-awesome-icon
          @click="handleUnbookmark"
          :icon="['fas', 'bookmark']"
          class="icon svg-mid"
          id="bookmark"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostUserInfo',
  props: {
    author: {
      type: Object,
      required: true
    },
    post: {
      type: Object,
      required: true
    },
    isBookmarked: {
      type: Boolean,
      required: true
    },
    isFollowing: {
      type: Boolean,
      required: true
    },
    currentUserId: {
      type: Number
    }
  },
  methods: {
    handleBookmark() {
      this.$emit('after-handle-bookmark', this.$route.params.id)
    },
    handleUnbookmark() {
      this.$emit('after-handle-unbookmark', this.$route.params.id)
    },
    handleFollow() {
      this.$emit('after-handle-follow', this.$route.params.id)
    },
    handleUnfollow() {
      this.$emit('after-handle-unfollow', this.$route.params.id)
    }
  }
}
</script>

<style scoped>
#post-user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 30px 0;
}

#col-left {
  display: flex;
}

#col-left #info {
  margin-left: 10px;
}

#avatar {
  width: 48px;
  height: 48px;
}

h6 span,
#col-right svg {
  cursor: pointer;
}
</style>
