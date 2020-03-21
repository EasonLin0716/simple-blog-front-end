<template>
  <div id="user-posts">
    <h5 id="latest">Latest</h5>
    <div v-for="(post, index) in posts" :key="post.id">
      <div class="card">
        <div id="info">
          <div id="user-info">
            <div>
              <img
                :src="user.avatar"
                class="rounded-circle size-mid"
                alt=""
                id="avatar"
              />
            </div>
            <div>
              <h6>{{ user.name }}</h6>
              <span>
                {{ post.monthDay }}&nbsp;&bull;&nbsp;{{ post.readTime }}
              </span>
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
              <div id="claps">
                <template v-if="post.clappedTime && post.isClapped">
                  <button
                    v-if="post.clappedTime && post.isClapped"
                    :class="'clap ind' + index"
                  >
                    <img
                      @click="handleClap"
                      :src="clapHands"
                      alt="clap"
                      :data-postId="post.id"
                      class="icon"
                    />
                  </button>
                  <span>&nbsp;{{ post.clappedTime }}</span>
                  <span
                    v-show="post.clapping"
                    class="rounded-circle size-mid"
                    :class="'clap-count ind' + index"
                  >
                    {{ post.clapping }}
                  </span>
                </template>
                <template v-else-if="post.clappedTime">
                  <button :class="'clap ind' + index">
                    <img
                      @click="handleClap"
                      :src="clap"
                      alt="clap"
                      :data-postId="post.id"
                      class="icon"
                    />
                  </button>
                  &nbsp;{{ post.clappedTime }}
                  <span
                    v-show="post.clapping"
                    :class="'clap-count ind' + index"
                    >{{ post.clapping }}</span
                  >
                </template>
                <template v-else>
                  <button :class="'clap ind' + index">
                    <img
                      @click="handleClap"
                      :src="clap"
                      alt="clap"
                      :data-postId="post.id"
                      class="icon"
                    />
                  </button>
                  <span
                    v-show="post.clapping"
                    :class="'clap-count ind' + index"
                    >{{ post.clapping }}</span
                  >
                </template>
              </div>
              <!-- bookmark -->
              <font-awesome-icon
                v-show="!post.isBookmarked"
                :data-postId="post.id"
                :icon="['far', 'bookmark']"
                class="icon icon-mid"
                @click="handleBookmark"
                :disabled="isLoading"
              />
              <div v-show="post.isBookmarked" :data-postId="post.id">
                <font-awesome-icon
                  :icon="['fas', 'bookmark']"
                  class="icon icon-mid"
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
const mojsAnimation = require('../utils/mojsAnimation')
export default {
  name: 'UserPosts',
  props: {
    posts: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    clapCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg'),
      isLoading: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  mounted() {
    setTimeout(() => {
      const claps = this.$el.querySelectorAll('.clap')
      for (let i = 0; i < claps.length; i++) {
        const clap = claps[i]
        mojsAnimation.clapEffect(clap, `.clap.ind${i}`, `.clap-count.ind${i}`)
      }
    }, 1000)
  },
  methods: {
    handleBookmark(e) {
      this.isLoading = true
      const { postId } =
        e.target.tagName === 'path'
          ? e.target.parentNode.dataset
          : e.target.dataset
      this.$emit('after-handle-bookmark', postId)
      this.isLoading = false
    },
    handleUnbookmark(e) {
      this.isLoading = true
      const postId =
        e.target.parentNode.parentNode.dataset.postid ||
        e.target.parentNode.dataset.postid
      this.$emit('after-handle-unbookmark', postId)
      this.isLoading = false
    },
    handleClap(e) {
      const { postid } = e.target.dataset
      this.$emit('after-handle-clap', postid)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/sass/_variables.scss';
@import '../assets/sass/mixins.scss';
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

#claps {
  position: relative;
}

.clap-count {
  @include clap-count-effect(30px, -10px);
}
</style>
