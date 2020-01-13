<template>
  <div id="user-posts">
    <h5 id="latest">Latest</h5>
    <div v-for="post in posts" :key="post.id">
      <div class="card">
        <div id="info">
          <div id="user-info">
            <div>
              <img :src="user.avatar" alt="" id="avatar" />
            </div>
            <div>
              <h6>{{ user.name }}</h6>
              <span> {{ post.monthDay }}&bull;{{ post.readTime }} </span>
            </div>
          </div>
          <div id="post-info">
            <div id="cover">
              <router-link :to="'/posts/' + post.id" id="post-link">
                <img :src="post.cover" alt="cover" />
              </router-link>
            </div>
            <div id="content">
              <h2>{{ post.title }}</h2>
              <article v-html="post.content">
                <!-- {{ post.content }} -->
              </article>
            </div>
            <div id="icons">
              <!-- claps -->
              <div>
                <template v-if="post.clappedTime && post.isClapped">
                  <div id="claps">
                    <img
                      @click="handleClap"
                      :src="clapHands"
                      alt="clap"
                      id="clap"
                      :data-postId="post.id"
                    />&nbsp;{{ post.clappedTime }}
                    <template v-if="post.clapping">
                      +{{ post.clapping }}
                    </template>
                  </div>
                </template>
                <template v-else-if="post.clappedTime">
                  <img
                    @click="handleClap"
                    :src="clap"
                    alt="clap"
                    id="clap"
                    :data-postId="post.id"
                  />&nbsp;{{ post.clappedTime }}
                  <template v-if="post.clapping">+{{ post.clapping }}</template>
                </template>
                <template v-else>
                  <img
                    @click="handleClap"
                    :src="clap"
                    alt="clap"
                    id="clap"
                    :data-postId="post.id"
                  />
                  <template v-if="post.clapping">+{{ post.clapping }}</template>
                </template>
              </div>
              <!-- bookmark -->
              <font-awesome-icon
                v-show="!post.isBookmarked"
                :data-postId="post.id"
                :icon="['far', 'bookmark']"
                id="bookmark"
                @click="handleBookmark"
                :disabled="isLoading"
              />
              <div v-show="post.isBookmarked" :data-postId="post.id">
                <font-awesome-icon
                  :icon="['fas', 'bookmark']"
                  id="bookmark"
                  @click="handleUnbookmark"
                  :disabled="isLoading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserPosts',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg')
    }
  },
  methods: {
    handleBookmark(e) {
      const { postId } = e.target.dataset
      this.$emit('after-handle-bookmark', postId)
    },
    handleUnbookmark(e) {
      const postId =
        e.target.parentNode.parentNode.dataset.postid ||
        e.target.parentNode.dataset.postid
      this.$emit('after-handle-unbookmark', postId)
    },
    handleClap(e) {
      const { postid } = e.target.dataset
      this.$emit('after-handle-clap', postid)
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
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    clapCount: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped>
svg {
  cursor: pointer;
}

#info {
  padding: 25px;
}

#avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

#latest {
  margin-top: 30px;
}

#cover {
  height: 189px;
  overflow: hidden;
  margin: 20px 0 10px 0;
}

#post-link img {
  transform: translateY(-25%);
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
  font-size: 14px;
}

#clap {
  cursor: pointer;
}
</style>
