<template>
  <div id="user-stories-top-info">
    <div id="title">
      <h1>Your stories</h1>
      <div>
        <a href="#" class="btn btn-dark">Import a story</a>
        <router-link to="/posts/create" class="btn btn-success ml-2">
          Write a story
        </router-link>
      </div>
    </div>
    <div id="drafts-published">
      <ul>
        <li
          :style="{
            borderBottom: currentRoute.includes('drafts') ? '3px solid' : ''
          }"
        >
          <router-link to="/users/stories/drafts">
            Drafts
          </router-link>
        </li>
        <li
          :style="{
            borderBottom: currentRoute.includes('public') ? '3px solid' : ''
          }"
        >
          <router-link to="/users/stories/public">
            Published
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserStoriesTopInfo',
  computed: {
    currentRoute: function() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
#title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}

#drafts-published {
  border-bottom: 1px solid #ccc;
}

li {
  margin-right: 20px;
  padding-bottom: 8px;
}
</style>
