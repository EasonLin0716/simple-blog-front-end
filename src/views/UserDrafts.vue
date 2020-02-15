<template>
  <div id="user-drafts" class="user-stories">
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
