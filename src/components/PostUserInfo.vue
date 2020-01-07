<template>
  <div id="post-user-info">
    <div id="col-left">
      <img :src="author.avatar" alt="avatar" id="avatar" />
      <div id="info">
        <h6>
          {{ author.name }} <span class="badge badge-success">Follow</span>
        </h6>
        <span> {{ post.monthDay }}&bull;{{ post.readTime }} </span>
      </div>
    </div>
    <div id="col-right">
      <font-awesome-icon :icon="['fab', 'twitter']" id="twitter" />
      <font-awesome-icon :icon="['fab', 'facebook']" id="facebook" />
      <template v-if="!isBookmarked">
        <font-awesome-icon
          @click="handleBookmark"
          :icon="['far', 'bookmark']"
          id="bookmark"
        />
      </template>
      <template v-else>
        <font-awesome-icon
          @click="handleUnbookmark"
          :icon="['fas', 'bookmark']"
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
    }
  },
  methods: {
    handleBookmark() {
      this.$emit('after-handle-bookmark', this.$route.params.id)
    },
    handleUnbookmark() {
      this.$emit('after-handle-unbookmark', this.$route.params.id)
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

h6 {
  margin: 0;
  padding: 0;
}

#avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

#twitter,
#facebook {
  font-size: 22px;
  margin-right: 8px;
}
#bookmark {
  font-size: 22px;
}
</style>
