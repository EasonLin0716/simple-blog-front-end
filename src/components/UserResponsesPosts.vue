<template>
  <div id="user-responses-posts">
    <h5 id="responses">Responses</h5>
    <div v-for="reply in replies" :key="reply.id">
      <div class="card">
        <div id="info">
          <div id="user-info">
            <div>
              <img :src="user.avatar" alt="" id="avatar" />
            </div>
            <div>
              <h6>{{ user.name }}</h6>
              <span> {{ reply.monthDay }}&bull;{{ reply.readTime }} </span>
            </div>
          </div>
          <div id="post-info" class="card">
            <div>
              <span id="post-title">{{ reply.postTitle }}</span>
              <div id="icon-box">
                <div v-if="reply.postClapTimes" id="clap-hands">
                  <img :src="clapHands" alt="clap" />
                  {{ reply.postClapTimes }}
                </div>

                <div>
                  <font-awesome-icon :icon="['fas', 'comment']" id="comment" />
                  {{ reply.postReplyTimes }}
                </div>
              </div>
            </div>
            <span id="post-author">{{ user.name }}</span>
          </div>
          <div id="reply-info">
            <div id="content">
              {{ reply.replyContent }}
            </div>
            <div id="icons">
              <!-- claps -->
              <template v-if="reply.postClapTimes">
                <div id="claps">
                  <img :src="clapHands" alt="clap" />&nbsp;{{
                    reply.postClapTimes
                  }}
                </div>
              </template>
              <template v-else>
                <img :src="clap" alt="clap" />
              </template>
              <!-- bookmark -->
              <font-awesome-icon :icon="['far', 'bookmark']" id="bookmark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserResponsesPosts',
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg')
    }
  },
  props: {
    replies: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
#user-responses-posts {
  max-width: 680px;
  margin: 0 auto;
}

#user-info {
  display: flex;
}

#user-info div {
  margin-right: 10px;
}

#user-info span {
  color: rgb(120, 120, 120);
  font-size: 14px;
}

#responses {
  margin-top: 30px;
}

#info {
  padding: 25px;
}

#post-info {
  padding: 23px;
  margin: 10px 0;
}

#post-info div {
  display: flex;
  justify-content: space-between;
}

#icon-box {
  align-items: center;
}

#icon-box #comment,
#icon-box img {
  margin: 0 5px;
}

#post-title img {
  width: 5px;
  height: 5px;
}

#clap img,
#clap-hands img {
  width: 16px;
  height: 16px;
}

#post-author {
  font-size: 14px;
  color: #999;
  font-weight: 400;
}

#post-title {
  font-size: 20px;
}

#avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

#icons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

#icons img {
  width: 25px;
  height: 25px;
}

#bookmark {
  font-size: 25px;
}

#user-info span {
  color: rgb(120, 120, 120);
  font-size: 14px;
}
</style>
