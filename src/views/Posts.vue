<template>
  <div id="posts">
    <div class="row" id="top-posts">
      <div class="col-4 col-left">
        <div id="col-left-box">
          <router-link :to="'/posts/' + posts[0].id">
            <img :src="posts[0].cover" alt="cover" />
            <h2>{{ posts[0].title }}</h2>
            <p>{{ posts[0].content.substring(0, 50) }}...</p>
          </router-link>
          <router-link :to="'/users/' + posts[0].authorId">
            <span class="text-secondary d-block">{{ posts[0].author }}</span>
          </router-link>
          <span>{{ posts[0].monthDay }}&bull;{{ posts[0].readTime }}</span>
        </div>
      </div>
      <div class="col-4 col-mid">
        <div id="col-mid-box">
          <div id="img-box">
            <router-link :to="'/posts/' + posts[1].id">
              <img :src="posts[1].cover" alt="cover" />
            </router-link>
          </div>
          <div id="info">
            <router-link :to="'/posts/' + posts[1].id">
              <h6>{{ posts[1].title }}</h6>
            </router-link>
            <router-link :to="'/users/' + posts[1].authorId">
              <span class="text-secondary d-block">{{ posts[1].author }}</span>
            </router-link>
            <span>{{ posts[1].monthDay }}&bull;{{ posts[1].readTime }}</span>
          </div>
        </div>
        <div id="col-mid-box">
          <div id="img-box">
            <router-link :to="'/posts/' + posts[2].id">
              <img :src="posts[2].cover" alt="cover" />
            </router-link>
          </div>
          <div id="info">
            <router-link :to="'/posts/' + posts[2].id">
              <h6>{{ posts[2].title }}</h6>
            </router-link>
            <router-link :to="'/users/' + posts[2].authorId">
              <span class="text-secondary d-block">{{ posts[2].author }}</span>
            </router-link>
            <span>{{ posts[2].monthDay }}&bull;{{ posts[2].readTime }}</span>
          </div>
        </div>
        <div id="col-mid-box">
          <div id="img-box">
            <router-link :to="'/posts/' + posts[3].id">
              <img :src="posts[3].cover" alt="cover" />
            </router-link>
          </div>
          <div id="info">
            <router-link :to="'/posts/' + posts[3].id">
              <h6>{{ posts[3].title }}</h6>
            </router-link>
            <router-link :to="'/users/' + posts[3].authorId">
              <span class="text-secondary d-block">{{ posts[3].author }}</span>
            </router-link>
            <span>{{ posts[3].monthDay }}&bull;{{ posts[3].readTime }}</span>
          </div>
        </div>
      </div>
      <div class="col-4 col-right">
        <div id="col-right-box">
          <router-link :to="'/posts/' + posts[4].id">
            <img :src="posts[4].cover" alt="cover" />
            <h2>{{ posts[4].title }}</h2>
            <p>{{ posts[4].content.substring(0, 50) }}...</p>
          </router-link>
          <router-link :to="'/users/' + posts[3].authorId">
            <span class="text-secondary d-block">{{ posts[4].author }}</span>
          </router-link>
          <span>{{ posts[4].monthDay }}&bull;{{ posts[4].readTime }}</span>
        </div>
      </div>
    </div>
    <hr />
    <div class="row" id="contents">
      <div class="col-8">
        <div v-for="post in posts" :key="post.id" id="post">
          <div id="p-left">
            <router-link :to="'/posts/' + post.id">
              <h4>{{ post.title }}</h4>
              <p>{{ post.content.substring(0, 40) }}...</p>
            </router-link>
            <div id="bottom">
              <div>
                <router-link :to="'/users/' + post.authorId">
                  <span class="d-block">{{ post.author }}</span>
                </router-link>
                <span>{{ post.monthDay }}&bull;{{ post.readTime }}</span>
              </div>
              <div id="icons">
                <font-awesome-icon
                  @click="handleBookmark"
                  :icon="['far', 'bookmark']"
                  id="bookmark"
                />
                <img :src="ellipsis" alt="ellipsis" id="ellipsis" />
              </div>
            </div>
          </div>
          <div id="p-right">
            <router-link :to="'/posts/' + post.id">
              <img :src="post.cover" alt="cover" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-4">
        <!-- Display info -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import postAPI from './../apis/posts'
export default {
  name: 'Posts',
  components: {},
  data() {
    return {
      posts: [],
      ellipsis: require('../../static/images/ellipsis-h-solid.svg')
    }
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    /* eslint-disable */
    async fetchPosts() {
      try {
        const response = await postAPI.getPosts()
        const { data } = response
        this.posts = data.posts
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000;
}

#ellipsis,
#bookmark {
  width: 20px;
  height: 20px;
}

#post {
  display: flex;
  justify-content: space-between;
}

img {
  max-width: 100%;
  max-height: 100%;
}

#posts {
  margin: 0 auto;
  max-width: 1032px;
}

#col-left-box img,
#col-right-box img {
  height: 150px;
  width: 100%;
}

#col-mid-box {
  display: flex;
  margin-bottom: 20px;
}

#img-box {
  overflow: hidden;
  height: 100px;
  width: 100px;
  margin-right: 10px;
}

#img-box img {
  width: 100px;
  height: 100px;
}

#bottom {
  display: flex;
  justify-content: space-between;
}

#bottom #icons {
  display: flex;
  align-items: center;
}

#p-left {
  width: 100%;
}

#p-right {
  width: 152px;
  height: 122px;
  margin-left: 40px;
}

#p-right img {
  height: 100%;
}
</style>
