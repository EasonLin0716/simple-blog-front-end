<template>
  <div class="col-4" id="posts-down-right">
    <img src="https://imgur.dcard.tw/43vHp3W.jpg" alt="" />
    <div id="new-from-network">
      <div id="new-from-network-title">
        <h3>New from your network</h3>
        <img src="https://fakeimg.pl/135x118/" alt="img" />
      </div>
      <div id="new-from-network-posts">
        <p v-for="post in newPosts" :key="post.id">
          {{ post.title }}
        </p>
      </div>
    </div>
    <div id="popular-on-site">
      <div id="popular-on-site-title">
        <h3>Popular on site</h3>
      </div>
      <div id="popular-on-site-posts">
        <p v-for="post in popularPosts" :key="post.id">
          {{ post.title }}
        </p>
      </div>
    </div>
    <div id="reading-list">
      <div id="reading-list-title">
        <h3>Reading list</h3>
      </div>
      <div id="reading-list-posts">
        <p>reading-list-posts</p>
      </div>
    </div>
    <div id="tool-bar">
      <ul>
        <li>Help</li>
        <li>Status</li>
        <li>Writers</li>
        <li>Blog</li>
        <li>Careers</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>About</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsDownRight',
  props: {
    newPosts: {
      type: Array,
      required: true
    },
    popularPosts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>
