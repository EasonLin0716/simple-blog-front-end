<template>
  <div id="post-create">
    <form @submit.stop.prevent="handleCreatePost">
      <input
        name="title"
        type="text"
        v-model="title"
        placeholder="Title"
        id="title"
        class="mb-2"
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
      >
      </medium-editor>
      <div class="d-flex justify-content-between">
        <button :disabled="isPosting" type="submit" class="btn btn-success">
          {{ !isPosting ? 'Publish' : 'Publising...' }}
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
import { Toast } from '../utils/helpers'
export default {
  name: 'PostCreate',
  components: {
    'medium-editor': editor,
  },
  data() {
    return {
      title: '',
      content: '',
      image: '',
      imageSrc: '',
      isPosting: false,
      options: {
        toolbar: {
          allowMultiParagraphSelection: true,
          buttons: [
            'bold',
            'italic',
            'underline',
            'anchor',
            'h1',
            'h2',
            'h3',
            'quote',
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
          updateOnEmptySelection: false,
        },
        placeholder: {
          text: 'Tell your story',
          hideOnClick: true,
        },
      },
    }
  },
  mounted() {
    this.imageDropListener()
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
    async handleCreatePost(e) {
      try {
        this.isPosting = true
        const formData = new FormData(e.target)
        formData.append('content', this.content)
        formData.append('UserId', this.currentUser.id)
        const { data } = await postsAPI.createPost(formData)
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '文章發布成功！',
          })
          this.isPosting = false
          this.$router.push(`/posts/${data.PostId}`)
        }
      } catch (error) {
        this.isPosting = false
        Toast.fire({
          icon: 'error',
          title: '發生錯誤，請稍後再試！',
        })
      }
    },
    imageDropListener() {
      const ed = document.querySelector('#content')

      ed.addEventListener('drop', () => {
        setTimeout(async () => {
          const image = document.querySelector(
            "#post-create img[src^='data:image']"
          )
          if (!image) {
            return Toast.fire({
              icon: 'error',
              title: '上傳圖片失敗',
            })
          }
          const imageBase64 = image.src.split(',')[1]
          const res = await postsAPI.postImage({ imageBase64: imageBase64 })
          if (res.data.status === 'success') {
            image.src = res.data.imgurLink
            console.log(res.data.imgurLink)
            Toast.fire({
              icon: 'success',
              title: '圖片上傳成功!!',
            })
            // 圖片上傳成功後把 editor 內容回傳到 content 中
            this.content = ed.innerHTML
          }
        }, 100)
      })
    },
  },
  computed: {
    ...mapState(['currentUser']),
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/css/medium-editor.css';
@import '../assets/sass/mixins.scss';

#post-create {
  @include post-editor-container;
  textarea {
    @include post-editor;
  }
  #title {
    @include post-editor-title;
  }
  #content {
    @include post-editor-content;
  }
}

@media screen and (max-width: 720px) {
  #post-create {
    @include post-editor-container-rwd;
  }
  #title {
    @include post-editor-title-rwd;
  }
  img {
    @include post-editor-img-rwd;
  }
}
</style>
