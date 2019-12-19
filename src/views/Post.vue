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
    <PostFooter :author="author" :post="post" />
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
import PostUserInfo from '../components/PostUserInfo'
import PostFooter from '../components/PostFooter'
export default {
  name: 'Post',
  components: { PostUserInfo, PostFooter },
  data() {
    return {
      post: {
        id: null,
        title: '',
        content: '',
        cover: '',
        applauseFrom: '',
        clappedTimes: null,
        monthDay: '',
        readTime: ''
      },
      author: {
        id: null,
        name: '',
        avatar: '',
        introduction: '',
        isAdmin: null,
        Followers: [],
        Followings: []
      }
    }
  },
  methods: {
    async fetchPost(postId) {
      try {
        const { data, statusText } = await postsAPI.getPost({
          postId
        })
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
