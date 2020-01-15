<template>
  <div id="user-stories-posts">
    <div v-for="post in posts" :key="post.id" id="post">
      <router-link :to="'/posts/' + post.id" id="post-link">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </router-link>
      <span
        >Published on {{ post.monthDay }} &bull; {{ post.readTime }}
        <font-awesome-icon
          :icon="['fas', 'chevron-down']"
          id="chevron-down"
          role="button"
          data-toggle="dropdown"
        />
        <div class="dropdown-menu">
          <router-link class="dropdown-item" :to="'/posts/' + post.id + '/edit'"
            >Edit Story</router-link
          >
          <button
            class="dropdown-item"
            :data-postid="post.id"
            @click="handleDeletePost"
          >
            Delete Story
          </button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserStoriesPosts',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleDeletePost(e) {
      const postId = e.target.dataset.postid
      this.$emit('after-handle-delete-post', postId)
    }
  }
}
</script>

<style scoped>
#post {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}

a:hover {
  color: #000;
}

span,
p {
  color: rgb(117, 117, 117);
}

p {
  font-size: 20px;
  padding-bottom: 7px;
}

#chevron-down:hover {
  color: #000;
  cursor: pointer;
}
</style>
