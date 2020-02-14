<template>
  <div id="post-footer">
    <div id="icons">
      <div>
        <div id="claps">
          <button v-if="post.clappedTimes" :disabled="isLoading" id="clap">
            <img
              v-on:click="handleClap"
              :src="clapHands"
              alt="clap"
              :data-postid="post.id"
            />
          </button>
          <button v-else :disabled="isLoading" id="clap">
            <img
              v-on:click="handleClap"
              :src="clap"
              alt="clap"
              :data-postid="post.id"
            />
          </button>
          <span v-show="!clapCount">
            &nbsp;{{ post.clappedTimes }}&nbsp;claps&nbsp;</span
          >
          <span id="clap-count"> {{ clapCount }} </span>
        </div>
      </div>
      <div id="links">
        <font-awesome-icon :icon="['fab', 'twitter']" class="icon" />
        <font-awesome-icon :icon="['fab', 'facebook']" class="icon" />
        <template v-if="!isBookmarked">
          <font-awesome-icon
            @click="handleBookmark"
            :icon="['far', 'bookmark']"
            class="icon"
          />
        </template>
        <template v-else>
          <font-awesome-icon
            @click="handleUnbookmark"
            :icon="['fas', 'bookmark']"
            class="icon"
          />
        </template>
        <img :src="ellipsis" alt="ellipsis" class="icon" />
      </div>
    </div>
    <div id="written-by">
      <div id="intro">
        <div id="avatar">
          <img :src="author.avatar" alt="avatar" />
        </div>
        <div id="info">
          <h6>Written by</h6>
          <h5>
            {{ author.name }}
          </h5>
          <p>{{ author.introduction }}</p>
        </div>
      </div>
      <div id="follow">
        <router-link
          to="/users/edit"
          v-if="currentUserId === author.id"
          class="link badge badge-success"
          >Edit Profile</router-link
        >
        <span
          @click="handleFollow"
          v-else-if="!isFollowing"
          class="link badge badge-success"
          >Follow</span
        >
        <span
          @click="handleUnfollow"
          v-else-if="isFollowing"
          class="link badge badge-info"
          >Following</span
        >
      </div>
    </div>
    <router-link
      :to="'/posts/' + post.id + '/replies'"
      class="btn btn-block button-white-green py-4"
      id="response-button"
    >
      Write the first response
    </router-link>
  </div>
</template>

<script>
import mojs from '@mojs/core'

export default {
  name: 'PostFooter',
  data() {
    return {
      clap: require('../../static/images/clap.svg'),
      clapHands: require('../../static/images/clap-hands.svg'),
      ellipsis: require('../../static/images/ellipsis-h-solid.svg')
    }
  },

  props: {
    post: {
      type: Object,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    clapCount: {
      type: Number,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    isBookmarked: {
      type: Boolean,
      required: true
    },
    isFollowing: {
      type: Boolean,
      required: true
    },
    currentUserId: {
      type: Number
    }
  },
  methods: {
    handleClap() {
      this.$emit('after-handle-clap')
    },
    handleBookmark() {
      this.$emit('after-handle-bookmark', this.$route.params.id)
    },
    handleUnbookmark() {
      this.$emit('after-handle-unbookmark', this.$route.params.id)
    },
    handleFollow() {
      this.$emit('after-handle-follow', this.$route.params.id)
    },
    handleUnfollow() {
      this.$emit('after-handle-unfollow', this.$route.params.id)
    }
  },
  mounted() {
    const clap = document.querySelector('#clap')
    const tlDuration = 300
    const triangleBurst = new mojs.Burst({
      parent: clap,
      radius: { 50: 95 },
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
      radius: { 50: 75 },
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
      el: '#clap',
      duration: tlDuration,
      scale: { 1: 1.3 },
      easing: mojs.easing.out
    }).then({
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out
    })
    const countAnimation = new mojs.Html({
      el: '#clap-count',
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
}
</script>
<style lang="scss" scoped>
$dark-green: rgb(0, 75, 0);

#claps {
  position: relative;
}

#icons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

#clap img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  padding: 12px;
}

#links {
  display: flex;
  align-items: center;
}

#links * {
  margin-left: 10px;
  width: 25px;
  height: 25px;
}

#written-by {
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  margin: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

#written-by #intro {
  display: flex;
}

#avatar {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

#avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

#response-button {
  margin-bottom: 60px;
}

#clap-count {
  position: absolute;
  bottom: 60px;
  left: 10px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: #000;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  line-height: 40px;
}

.button-white-green {
  color: $dark-green;
  border: 1px solid $dark-green;
  font-weight: bold;
  transition: background 0.5s;
}

.button-white-green:hover {
  background: $dark-green;
  color: #fff;
}
</style>
