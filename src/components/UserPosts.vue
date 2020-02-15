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
import mojs from '@mojs/core'
export default {
  name: 'UserPosts',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg'),
      isLoading: false
    }
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
    clapCount: {
      type: Number,
      required: true
    }
  },
  mounted() {
    setTimeout(() => {
      const claps = this.$el.querySelectorAll('.clap')
      console.log(claps)
      for (let i = 0; i < claps.length; i++) {
        const clap = claps[i]
        const tlDuration = 300
        const triangleBurst = new mojs.Burst({
          parent: clap,
          radius: { 25: 50 },
          count: 5,
          angle: 30,
          children: {
            shape: 'polygon',
            radius: { 6: 0 },
            scale: 1,
            stroke: 'rgba(211,84,0 ,0.5)',
            strokeWidth: 2,
            angle: 210,
            delay: 30,
            speed: 0.2,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
            duration: tlDuration
          }
        })
        const circleBurst = new mojs.Burst({
          parent: clap,
          radius: { 25: 50 },
          angle: 25,
          duration: tlDuration,
          children: {
            shape: 'circle',
            fill: 'rgba(149,165,166 ,0.5)',
            delay: 30,
            speed: 0.2,
            radius: { 3: 0 },
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        })
        const scaleButton = new mojs.Html({
          el: `.clap.ind${i}`,
          duration: tlDuration,
          scale: { 1: 1.3 },
          easing: mojs.easing.out
        }).then({
          duration: tlDuration,
          scale: { 1.3: 1 },
          easing: mojs.easing.out
        })
        const countAnimation = new mojs.Html({
          el: `.clap-count.ind${i}`,
          isShowStart: false,
          isShowEnd: true,
          y: { 0: -30 },
          opacity: { 0: 1 },
          duration: tlDuration
        }).then({
          opacity: { 1: 0 },
          y: -80,
          delay: tlDuration / 2
        })
        const animationTimeline = new mojs.Timeline()
        animationTimeline.add([
          triangleBurst,
          circleBurst,
          countAnimation,
          scaleButton
        ])
        clap.addEventListener('click', () => {
          animationTimeline.replay()
        })
      }
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';

svg {
  cursor: pointer;
}

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
  position: absolute;
  bottom: 30px;
  left: -10px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: #000;
  line-height: 40px;
}
</style>
