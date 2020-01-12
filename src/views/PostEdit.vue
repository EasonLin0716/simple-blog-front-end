<template>
  <div id="post-create">
    <form @submit.stop.prevent="handleEditPost">
      <input
        name="title"
        type="text"
        v-model="title"
        class="form-control"
        placeholder="Title"
        id="title"
      />
      <textarea
        name="content"
        id="content"
        class="form-control"
        v-model="content"
        rows="20"
        placeholder="Tell your story..."
      ></textarea>
      <button type="submit" class="btn btn-success">Edit</button>
    </form>
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
export default {
  name: 'PostEdit',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async fetchPost(postId) {
      const { data } = await postsAPI.getPost(postId)
      this.title = data.post.title
      this.content = data.post.content
    },
    async handleEditPost(e) {
      try {
        const form = e.target
        const formData = new FormData(form)
        const { id: postId } = this.$route.params
        const { data } = await postsAPI.putPost(formData, postId)
        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '修改文章大成功！'
          })
          this.$router.push(`/posts/${postId}`)
        }
        if (data.status === 'error') {
          Toast.fire({
            type: 'error',
            title: '發生錯誤，請稍後再試！'
          })
          this.$router.push(`/posts/${postId}`)
        }
      } catch (error) {
        Toast.fire({
          type: 'error',
          title: '修改文章失敗，請稍後再試！'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { id: postId } = this.$route.params
    if (postId !== this.currentUser.id) {
      this.$router.push(`/posts/${postId}`)
    }
    this.fetchPost(postId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: postId } = to.params
    this.fetchPost(postId)
    next()
  }
}
</script>

<style scoped>
#post-create {
  max-width: 700px;
  margin: 0 auto;
}

#title {
  font-weight: 400;
  font-size: 48px;
  border: none;
}

#content {
  margin-top: 10px;
  border: none;
}
</style>
