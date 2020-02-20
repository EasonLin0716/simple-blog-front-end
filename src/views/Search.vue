<template>
  <div id="search">
    <div id="search-text-box">
      <input type="text" :value="searchText" id="search-text" />
    </div>
    <ul id="bar">
      <li class="font-weight-bold">Stories</li>
      <li>People</li>
      <li>Publications</li>
      <li>Tags</li>
    </ul>
    <template v-if="posts.length">
      <h6>STORIES</h6>
      <div v-for="post in posts" :key="post" id="posts">
        <div id="author" class="d-flex align-items-center">
          <div id="avatar">
            <img
              class="rounded-circle size-small-mid"
              :src="post.authorAvatar"
              alt="authorAvatar"
            />
          </div>
          <div id="info">
            <router-link :to="'/users/' + post.authorId">
              <span>{{ post.author }}</span>
            </router-link>
            <br />
            <span
              >{{ post.monthDay }}&nbsp;&bull;&nbsp;{{ post.readTime }}</span
            >
          </div>
        </div>
        <router-link :to="'/posts/' + post.id">
          <div id="post">
            <h2>{{ post.title }}</h2>
            <div id="cover">
              <img :src="post.cover" alt="cover" />
            </div>
            <p>{{ post.content }}</p>
            <div id="read-more">
              <span>Read more...</span>
            </div>
          </div>
        </router-link>
      </div>
    </template>
    <template v-else>
      <h6>We couldn’t find any posts.</h6>
    </template>
  </div>
</template>

<script>
import postsAPI from '../apis/posts'
export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      posts: []
    }
  },
  methods: {
    async fetchPosts(searchText) {
      const { data } = await postsAPI.searchPost(searchText)
      this.posts = data.posts
    }
  },
  created() {
    this.searchText = this.$router.currentRoute.query.q
    this.fetchPosts(this.searchText)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
h6 {
  margin-top: 10px;
}

#search {
  max-width: 1000px;
  margin: 0 auto;
}

#search-text-box {
  padding-bottom: 40px;
}

#search-text {
  font-size: 56px;
  border: none;
  border-bottom: 1.5px solid #aaa;
  width: 100%;
}

#posts {
  margin: 20px 0 25px 0;
  border-bottom: 1px solid #ccc;
  max-width: 750px;
}

#bar {
  height: 44px;
  border-bottom: 1px solid #ccc;
}

#bar li {
  margin-right: 20px;
  font-size: $text-small;
}

#avatar {
  margin-right: 10px;
}

#info :first-child span {
  font-size: 15px;
  color: rgb(3, 168, 124);
  cursor: pointer;
}

#info :first-child:hover {
  color: green;
}

#info :last-child {
  font-size: $text-small;
  color: #666;
}

#cover {
  margin: 31px 0;
}

#read-more {
  color: #666;
  margin-bottom: 20px;
}

@media screen and (max-width: 720px) {
  #search {
    margin: 0 30px;
  }

  img {
    width: 100%;
    height: auto;
  }
}
</style>
