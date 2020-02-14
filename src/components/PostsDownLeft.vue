<template>
  <div class="col-md-8 m-md-0 m-2" id="posts-down-left">
    <div v-for="post in posts" :key="post.id" id="post">
      <div class="col-left">
        <router-link :to="'/posts/' + post.id">
          <h4>{{ post.title }}</h4>
        </router-link>
        <div>
          <div>
            <router-link :to="'/users/' + post.authorId">
              <span class="d-block">{{ post.author }}</span>
            </router-link>
            <span
              >{{ post.monthDay }}&nbsp;&bull;&nbsp;{{ post.readTime }}</span
            >
          </div>
        </div>
      </div>
      <div class="col-right">
        <div class="icons">
          <font-awesome-icon
            v-if="!post.isBookmarked"
            :disabled="isLoading"
            @click="handleBookmark"
            :data-postid="post.id"
            :icon="['far', 'bookmark']"
            class="icon icon-small"
          />
          <font-awesome-icon
            v-else
            :disabled="isLoading"
            @click="handleUnbookmark"
            :data-postid="post.id"
            :icon="['fas', 'bookmark']"
            class="icon icon-small"
          />
          <img :src="ellipsis" alt="ellipsis" class="icon svg-small ml-1" />
        </div>
        <div>
          <router-link :to="'/posts/' + post.id">
            <img :src="post.cover" alt="cover" class="post-cover" />
          </router-link>
        </div>
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
      const postId =
        e.target.tagName === 'path'
          ? e.target.parentNode.dataset.postid
          : e.target.dataset.postid
      this.$emit('after-handle-unbookmark', postId)
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
#post {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.col-right {
  display: flex;
  align-items: flex-end;
}

.post-cover {
  width: 116px;
  height: 122px;
}

.icons {
  display: flex;
  align-items: center;
  margin-right: 5px;
}
</style>
