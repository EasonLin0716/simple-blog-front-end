<template>
  <div id="user-stories-posts">
    <AppPacmanLoader v-if="isLoading" />
    <template v-else>
      <div v-for="post in posts" :key="post.id" class="posts">
        <router-link :to="'/posts/' + post.id" id="posts-link">
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
            <router-link
              class="dropdown-item"
              :to="'/posts/' + post.id + '/edit'"
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
    </template>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { Toast } from '@/utils/helpers'
import postsAPI from '@/apis/posts'
import usersAPI from '@/apis/user'
import AppPacmanLoader from '@/components/AppPacmanLoader'
export default {
  name: 'UserStoriesPosts',
  components: { AppPacmanLoader },
  data() {
    return {
      isLoading: true,
      posts: []
    }
  },
  created() {
    this.feachStories()
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
        this.afterHandleDeletePost(postId)
      }
    },
    async afterHandleDeletePost(postId) {
      try {
        const { data } = await postsAPI.deletePost(postId)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '文章刪除成功！'
          })
        }
        const idx = this.posts.map(d => d.id).indexOf(+postId)
        this.posts.splice(idx, 1)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除文章，請稍後再試！'
        })
      }
    },
    async feachStories() {
      try {
        const { data } = await usersAPI.gerUserStories()
        this.posts = data.posts
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得文章，請稍後再試！'
        })
      }
    }
  }
}
</script>

<style scoped>
.posts {
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
