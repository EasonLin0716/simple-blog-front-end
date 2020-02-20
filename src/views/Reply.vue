<template>
  <div id="reply">
    <section id="post-info" class="box-mid">
      <h6>Show responses for:</h6>
      <div class="card" id="post">
        <div id="title" class="d-flex justify-content-between">
          <p class="m-0">{{ postTitle }}</p>
          <div>
            <img :src="clapHands" alt="clap" id="clap" />
            <span>{{ clapTimes }}</span>
            <font-awesome-icon :icon="['fas', 'comment']" id="comment" />
            <span>{{ replyTimes }}</span>
          </div>
        </div>
        <span id="author">{{ author }}</span>
      </div>
    </section>
    <section id="reply-info">
      <div id="responses">
        <h6>Responses</h6>
      </div>
      <div id="reply-place">
        <form @submit.stop.prevent="handlePostReply">
          <textarea
            class="form-control"
            name="replyTextarea"
            id="replyTextarea"
            v-model="replyTextarea"
            cols="30"
            rows="3"
            placeholder="Write a response..."
          ></textarea>
          <button type="submit" class="btn btn-success mt-2">Publish</button>
        </form>
      </div>
      <div class="card" v-for="reply in replies" :key="reply.id" id="replies">
        <div id="info">
          <img
            :src="reply.avatar"
            alt="avatar"
            class="rounded-circle size-small-mid"
          />
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
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'

export default {
  name: 'Replies',
  data() {
    return {
      postId: 0,
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg'),
      replies: [],
      postTitle: '',
      author: '',
      clapTimes: null,
      replyTimes: null,
      replyTextarea: ''
    }
  },
  methods: {
    async fetchReplies(postId) {
      try {
        const { data, statusText } = await repliesAPI.getReplies({ postId })
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }
        this.postId = data.post.id
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
        Toast.fire({
          icon: 'error',
          title: '無法取得回覆，請稍後再試！'
        })
      }
    },
    async handlePostReply() {
      try {
        if (!this.isAuthenticated) {
          Toast.fire({
            icon: 'info',
            title: '請登入來使用此功能！'
          })
          return
        }
        if (!this.replyTextarea) {
          // TODO: 提示使用者不能輸入空白留言
          return
        }
        const { data } = await repliesAPI.postReply({
          content: this.replyTextarea,
          postId: this.postId,
          id: this.currentUser.id
        })
        this.replies.push({
          content: this.replyTextarea,
          monthDay:
            new Date().toString().slice(4, 7) +
            ' ' +
            new Date().toString().slice(8, 10),
          replier: this.currentUser.name,
          avatar: this.currentUser.avatar
        })
        this.replyTextarea = ''
        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '回復文章成功!!'
          })
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法回復文章，請稍後再試！'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
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

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

h6 {
  padding: 15px 0;
}

#post-info {
  #post {
    padding: 20px;
    margin-bottom: 40px;

    #clap {
      width: 16px;
      height: 16px;
      margin: 0 10px;
    }

    #comment {
      font-size: $text-small;
      margin: 0 10px;
    }
  }
}

#reply-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(250, 250, 250);
  padding-top: 0;

  #info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
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
  }

  #replies {
    width: 680px;
    padding: 20px;
    margin: 10px auto;
  }

  #responses,
  #reply-place {
    width: 680px;
    margin: 0 auto;
  }
}
</style>
