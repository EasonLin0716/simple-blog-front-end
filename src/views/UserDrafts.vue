<template>
  <div id="user-drafts">
    <UserStoriesTopInfo />
  </div>
</template>

<script>
import UserStoriesTopInfo from '../components/UserStoriesTopInfo'
export default {
  name: 'UserDrafts',
  components: { UserStoriesTopInfo }
}
</script>

<style scoped>
#user-drafts {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 64px 64px;
}
</style>
