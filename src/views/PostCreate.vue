<template>
  <div id="post-create">
    <form @submit.stop.prevent="handleCreatePost">
      <input
        name="title"
        type="text"
        v-model="title"
        placeholder="Title"
        id="title"
      />
      <h6 class="d-none">prevent medium editor from deleting input dom</h6>
      <medium-editor
        name="content"
        id="content"
        :text="content"
        :options="options"
        custom-tag="h4"
        v-on:edit="applyTextEdit"
      />
      <button type="submit" class="btn btn-success">Publish</button>
    </form>
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import editor from 'vue2-medium-editor'
import { mapState } from 'vuex'
export default {
  name: 'PostCreate',
  components: {
    'medium-editor': editor
  },
  data() {
    return {
      title: '',
      content: '',
      options: {
        toolbar: {
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
        },
        placeholder: {
          text: 'Tell your story',
          hideOnClick: true
        }
      }
    }
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

textarea {
  width: 600px;
  height: 500px;
}

#title {
  font-weight: 400;
  font-size: 48px;
  border: none;
}

#content {
  margin-bottom: 20px;
  border: none;
}

.medium-editor-element {
  outline: none;
}

a,
a:hover,
section.splash h1 span,
.medium-editor-toolbar li button,
.color-1,
.color-2 {
  color: #4fc08d;
}

body,
pre,
.medium-editor-button-active b,
code {
  color: #2c3e50;
}

.medium-editor-button-active.medium-editor-button-active.medium-editor-button-active {
  background-color: #4fc08d;
}

pre,
code {
  background: #f8f8f8;
  width: 80vw;
}

pre#cdn,
code.data,
pre#usage {
  max-width: 900px;
}

code.data {
  margin-top: 50px;
}

.medium-toolbar-arrow-over:before {
  border-color: transparent transparent #2c3e50 transparent;
}

.medium-editor-toolbar li button {
  border-right: 1px solid #2c3e50;
}

section.installation,
.medium-editor-toolbar,
.medium-editor-toolbar-anchor-preview,
.github-fork-ribbon {
  background: #2c3e50;
}

.medium-toolbar-arrow-under:after {
  border-color: #2c3e50 transparent transparent transparent;
}

#toolbar-placeholder {
  display: none;
}

.medium-editor-toolbar {
  transition: none;
}
</style>
