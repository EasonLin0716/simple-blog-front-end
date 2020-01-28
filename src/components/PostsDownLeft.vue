<template>
  <div class="col-md-8 m-md-0 m-2" id="posts-down-left">
    <div v-for="post in posts" :key="post.id" id="post">
      <div id="p-left">
        <router-link :to="'/posts/' + post.id">
          <h4>{{ post.title }}</h4>
        </router-link>
        <div id="bottom">
          <div>
            <router-link :to="'/users/' + post.authorId">
              <span class="d-block">{{ post.author }}</span>
            </router-link>
            <span
              >{{ post.monthDay }}&nbsp;&bull;&nbsp;{{ post.readTime }}</span
            >
          </div>
          <div id="icons">
            <font-awesome-icon
              v-if="!post.isBookmarked"
              :disabled="isLoading"
              @click="handleBookmark"
              :data-postid="post.id"
              :icon="['far', 'bookmark']"
              id="bookmark"
            />
            <font-awesome-icon
              v-else
              :disabled="isLoading"
              @click="handleUnbookmark"
              :data-postid="post.id"
              :icon="['fas', 'bookmark']"
              id="bookmark"
            />
            <img :src="ellipsis" alt="ellipsis" id="ellipsis" />
          </div>
        </div>
      </div>
      <div id="p-right">
        <router-link :to="'/posts/' + post.id">
          <img :src="post.cover" alt="cover" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsDownLeft',
  data() {
    return {
      isLoading: false,
      ellipsis: require('../../static/images/ellipsis-h-solid.svg')
    }
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleBookmark(e) {
      this.isLoading = true
      const postId =
        e.target.tagName === 'path'
          ? e.target.parentNode.dataset.postid
          : e.target.dataset.postid
      this.$emit('after-handle-bookmark', postId)
      this.isLoading = false
    },
    handleUnbookmark(e) {
      this.isLoading = true
      const postId = e.target.parentNode.dataset
        ? e.target.parentNode.dataset.postid
        : e.target.dataset.postId
      this.$emit('after-handle-unbookmark', postId)
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
#ellipsis,
#bookmark {
  width: 20px;
  height: 20px;
}

#p-left {
  width: 100%;
}

#p-right {
  width: 152px;
  height: 122px;
  margin-left: 40px;
}

#p-right img {
  height: 100%;
}

#bottom {
  display: flex;
  justify-content: space-between;
}

#bottom #icons {
  display: flex;
  align-items: center;
}

#post {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
