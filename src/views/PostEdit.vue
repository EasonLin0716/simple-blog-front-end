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
      <img v-if="image" :src="image" alt="image" width="640" height="480" />
      <h6 class="d-none">prevent medium editor from deleting input dom</h6>
      <medium-editor
        name="content"
        id="content"
        :text="content"
        :options="options"
        custom-tag="h4"
        v-on:edit="applyTextEdit"
      />
      <div class="d-flex justify-content-between">
        <button :disabled="isPosting" type="submit" class="btn btn-success">
          {{ !isPosting ? 'Edit' : 'Editing...' }}
        </button>
        <label for="image" class="btn btn-primary">Upload cover</label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file d-none"
          @change="handleFileChange"
        />
      </div>
    </form>
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import editor from 'vue2-medium-editor'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
export default {
  name: 'PostEdit',
  data() {
    return {
      title: '',
      content: '',
      image: '',
      isPosting: false,
      authorId: 0,
      options: {
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: [
            'bold',
            'italic',
            'underline',
            'anchor',
            'h2',
            'h3',
            'quote'
          ],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          align: 'center',
          sticky: false,
          updateOnEmptySelection: false
        }
      }
    }
  },
  components: {
    'medium-editor': editor
  },
  methods: {
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return
      const imageURL = window.URL.createObjectURL(files[0])
      this.image = imageURL
    },
    applyOptions(ev) {
      try {
        this.options = JSON.parse(ev.target.value)
        this.optionsValid = true
      } catch (e) {
        this.optionsValid = false
      }
    },
    applyTextEdit(ev) {
      if (ev.event.target) {
        this.content = ev.event.target.innerHTML
      }
    },
    async fetchPost(postId) {
      const { data } = await postsAPI.getPost(postId)
      this.title = data.post.title
      this.content = data.post.content
      this.authorId = data.author.id
      this.image = data.post.cover
      if (this.authorId !== this.currentUser.id) {
        Toast.fire({
          icon: 'error',
          title: '很抱歉，您沒有編輯權限'
        })
        this.$router.push(`/posts/${postId}`)
      }
    },
    async handleEditPost(e) {
      try {
        this.isPosting = true
        const { id: postId } = this.$route.params
        const formData = new FormData(e.target)
        formData.append('content', this.content)
        formData.append('userId', this.authorId)

        const { data } = await postsAPI.putPost(formData, postId)
        if (data.status === 'success') {
          this.isPosting = false
          Toast.fire({
            icon: 'success',
            title: '修改文章大成功！'
          })
          this.$router.push(`/posts/${postId}`)
        }
        if (data.status === 'error') {
          this.isPosting = false
          Toast.fire({
            icon: 'error',
            title: '發生錯誤，請稍後再試！'
          })
          this.$router.push(`/posts/${postId}`)
        }
      } catch (error) {
        this.isPosting = false
        Toast.fire({
          icon: 'error',
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
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
