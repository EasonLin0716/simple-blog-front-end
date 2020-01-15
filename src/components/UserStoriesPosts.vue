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
import Swal from 'sweetalert2'
export default {
  name: 'UserStoriesPosts',
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    async handleDeletePost(e) {
      const result = await Swal.fire({
        title: '您確定嗎？',
        text: '刪除的文章是回不來的喔！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '取消',
        confirmButtonText: '刪除'
      })
      if (result.value) {
        const postId = e.target.dataset.postid
        this.$emit('after-handle-delete-post', postId)
      }
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
