<template>
  <div class="col-8" id="posts-down-left">
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
            <font-awesome-icon :icon="['far', 'bookmark']" id="bookmark" />
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
</template>

<script>
export default {
  name: 'PostsDownLeft',
  data() {
    return {
      ellipsis: require('../../static/images/ellipsis-h-solid.svg')
    }
  },
  props: {
    posts: {
      type: Object,
      required: true
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

#bottom {
  display: flex;
  justify-content: space-between;
}

#bottom #icons {
  display: flex;
  align-items: center;
}

#post {
  display: flex;
  justify-content: space-between;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
