<template>
  <div id="posts-top">
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
  </div>
</template>

<script>
export default {
  name: 'PostsTop',
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
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
</style>
