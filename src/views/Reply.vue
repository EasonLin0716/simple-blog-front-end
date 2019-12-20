<template>
  <div id="reply">
    <section id="post-info">
      <h6>Show responses for:</h6>
      <div class="card" id="post">
        <div id="title">
          <p>{{ postTitle }}</p>
          <div>
            <img :src="clapHands" alt="clap" id="clap" />
            <span>{{ clapTimes }}</span>
            <font-awesome-icon :icon="['fas', 'comment']" id="comment" />
            <span>{{ replyTimes }}</span>
          </div>
        </div>
        <span>{{ author }}</span>
      </div>
    </section>
    <section id="reply-info">
      <div id="responses">
        <h6>Responses</h6>
      </div>
      <div id="reply-place">
        <textarea
          class="form-control"
          name="reply"
          id="reply"
          cols="30"
          rows="3"
          placeholder="Write a response..."
        ></textarea>
      </div>
      <div class="card" v-for="reply in replies" :key="reply.id" id="replies">
        <div id="info">
          <img :src="reply.avatar" alt="avatar" id="avatar" />
          <div>
            <span id="replier">{{ reply.replier }}</span>
            <br />
            <span id="month-day">{{ reply.monthDay }}</span>
          </div>
        </div>
        <div id="content">
          {{ reply.content }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import repliesAPI from '../apis/replies'

export default {
  name: 'Replies',
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg'),
      replies: [],
      postTitle: '',
      author: '',
      clapTimes: null,
      replyTimes: null
    }
  },
  methods: {
    async fetchReplies(postId) {
      try {
        const { data, statusText } = await repliesAPI.getReplies({ postId })
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        this.postTitle = data.post.title
        this.author = data.post.User.name
        this.clapTimes = data.post.clapTimes
        this.replyTimes = data.replies.length
        this.replies = data.replies.map(d => ({
          id: d.id,
          content: d.content,
          monthDay: d.monthDay,
          replier: d.User.name,
          avatar: d.User.avatar
        }))
      } catch (error) {
        // console.error(error)
      }
    }
  },
  created() {
    const { id: postId } = this.$route.params
    this.fetchReplies(postId)
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id: postId } = to.params
    this.fetchReplies(postId)
    next()
  }
}
</script>

<style scoped>
#post-info {
  width: 728px;
  margin: 0 auto;
  padding: 0 24px;
}

#reply-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(250, 250, 250);
}

#replies,
#responses,
#reply-place {
  width: 680px;
  margin: 0 auto;
}

#post {
  padding: 20px;
  margin-bottom: 40px;
}

#title {
  display: flex;
  justify-content: space-between;
}

#title p {
  display: inline;
  margin: 0;
}

#clap {
  width: 16px;
  height: 16px;
  margin: 0 10px;
}

#comment {
  font-size: 14px;
  margin: 0 10px;
}

#avatar {
  height: 36px;
  width: 36px;
  border-radius: 50%;
}

#replies {
  padding: 20px;
  margin: 10px auto;
}

#info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

#info img {
  margin-right: 10px;
}

#replier {
  font-size: 18px;
  color: rgb(0, 200, 45);
}

#month-day {
  font-size: 12px;
  color: #aaa;
}
</style>
