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
      <medium-editor
        name="content"
        id="content"
        :text="content"
        :options="options"
        custom-tag="h4"
        v-on:edit="applyTextEdit"
      />
      <button type="submit" class="btn btn-success">Edit</button>
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
      authorId: 0,
      options: {
        toolbar: {
          /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
          allowMultiParagraphSelection: true,
          buttons: [
            'bold',
            'italic',
            'underline',
            // 'anchor',
            'h2',
            'h3'
            // 'quote'
          ],
          diffLeft: 0,
          diffTop: -10,
          firstButtonClass: 'medium-editor-button-first',
          lastButtonClass: 'medium-editor-button-last',
          relativeContainer: null,
          standardizeSelectionStart: false,
          static: false,
          /* options which only apply when static is true */
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
      if (this.authorId !== this.currentUser.id) {
        Toast.fire({
          type: 'error',
          title: '很抱歉，您沒有編輯權限'
        })
        this.$router.push(`/posts/${postId}`)
      }
    },
    async handleEditPost(e) {
      try {
        const { id: postId } = this.$route.params
        const { data } = await postsAPI.putPost(
          { title: this.title, content: this.content, userId: this.authorId },
          postId
        )
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
