<template>
  <div id="post-create">
    <form @submit.stop.prevent="handleCreatePost">
      <input
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
      <button type="submit" class="btn btn-success">Publish</button>
    </form>
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import { mapState } from 'vuex'
export default {
  name: 'PostCreate',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async handleCreatePost() {
      try {
        const { data } = await postsAPI.createPost({
          title: this.title,
          content: this.content,
          // TODO: 上傳圖片、req.user.id
          cover: 'https://fakeimg.pl/640x480/',
          UserId: this.currentUser.id
        })
        // TODO: 偵錯功能

        this.$router.push(`/posts/${data.PostId}`)
      } catch (error) {
        // TODO: 錯誤提示
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
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
