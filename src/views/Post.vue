<template>
  <div id="post">
    <h1>{{ post.title }}</h1>
    <PostUserInfo :author="author" :post="post" />
    <div id="cover">
      <img :src="post.cover" alt="cover" />
    </div>
    <article>
      {{ post.content }}
    </article>
    <PostFooter
      :author="author"
      :post="post"
      :clapCount="clapCount"
      :isLoading="isLoading"
      @after-handle-clap="afterHandleClap"
    />
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import PostUserInfo from '../components/PostUserInfo'
import PostFooter from '../components/PostFooter'
import repliesAPI from '../apis/replies'
import { Toast } from './../utils/helpers'
export default {
  name: 'Post',
  components: { PostUserInfo, PostFooter },
  data() {
    return {
      clapCount: 0,
      clapTimer: null,
      isLoading: false,
      post: {
        id: 0,
        title: '',
        content: '',
        cover: '',
        applauseFrom: '',
        clappedTimes: 0,
        monthDay: '',
        readTime: ''
      },
      author: {
        id: 0,
        name: '',
        avatar: '',
        introduction: '',
        isAdmin: 0,
        Followers: [],
        Followings: []
      }
    }
  },
  methods: {
    async fetchPost(postId) {
      try {
        const { data, statusText } = await postsAPI.getPost(postId)
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        const { post, author } = data
        this.post = {
          ...this.post,
          id: post.id,
          title: post.title,
          content: post.content,
          cover: post.cover,
          applauseFrom: post.applauseFrom,
          clappedTimes: post.clappedTimes,
          monthDay: post.monthDay,
          readTime: post.readTime
        }
        this.author = {
          ...this.author,
          name: author.name,
          avatar: author.avatar,
          introduction: author.introduction,
          isAdmin: author.isAdmin,
          Followers: author.Followers || [],
          Followings: author.Followings || []
        }
      } catch (error) {
        // console.error(error)
      }
    },
    afterHandleClap() {
      if (this.clapTimer) {
        clearTimeout(this.clapTimer)
      }
      this.clapCount += 1
      this.post.clappedTimes += 1
      this.clapTimer = setTimeout(async () => {
        this.isLoading = true
        const clapInfo = {
          clapCount: this.clapCount
        }
        const { data } = await repliesAPI.clap(this.$route.params.id, clapInfo)
        if (data.status === 'success') {
          Toast.fire({
            type: 'success',
            title: '鼓掌成功!!'
          })
        }
        this.clapCount = 0
        this.$forceUpdate()
        this.isLoading = false
      }, 2000)
    }
  },
  created() {
    const { id: postId } = this.$route.params
    this.fetchPost(postId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: postId } = to.params
    this.fetchUser(postId)
    next()
  }
}
</script>

<style scoped>
#post {
  width: 728px;
  padding: 0 24px;
  margin: 0 auto;
}

#cover {
  display: flex;
  justify-content: center;
}

article {
  margin: 20px 0 40px 0;
}
</style>
