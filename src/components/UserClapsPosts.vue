<template>
  <div id="user-posts">
    <h5 id="latest">Claps</h5>
    <div v-for="post in posts" :key="post.id">
      <div class="card">
        <div id="info">
          <div id="user-info">
            <div>
              <img
                :src="user.avatar"
                alt=""
                id="avatar"
                class="rounded-circle size-mid"
              />
            </div>
            <div>
              <h6>{{ user.name }}</h6>
              <span> {{ post.monthDay }}&bull;{{ post.readTime }} </span>
            </div>
          </div>
          <div id="post-info">
            <div id="cover">
              <img :src="post.cover" alt="cover" />
            </div>
            <div id="content">
              <h2>{{ post.title }}</h2>
              {{ post.content }}
            </div>
            <div id="icons">
              <!-- claps -->
              <template v-if="post.clappedTime">
                <div id="claps">
                  <img :src="clapHands" alt="clap" />&nbsp;{{
                    post.clappedTime
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
// import userAPI from './../apis/user'
export default {
  name: 'UserClapsPosts',
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg')
    }
  },
  props: {
    posts: {
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
<style lang="scss" scoped>
@import '../assets/sass/_variables.scss';
#info {
  padding: 25px;
}

#latest {
  margin-top: 30px;
}

#cover {
  height: 189px;
  overflow: hidden;
  margin: 20px 0 10px 0;
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

#user-info {
  display: flex;
}

#user-info div {
  margin-right: 10px;
}

#user-info span {
  color: rgb(120, 120, 120);
  font-size: $text-small;
}
</style>
