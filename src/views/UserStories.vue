<template>
  <div id="user-stories" class="user-stories">
    <UserStoriesTopInfo />
    <router-view></router-view>
  </div>
</template>

<script>
import UserStoriesTopInfo from '@/components/UserStoriesTopInfo'
export default {
  name: 'UserStories',
  components: { UserStoriesTopInfo }
}
</script>
