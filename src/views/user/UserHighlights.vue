<template>
  <div id="user-highlights" class="user__posts"></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserHighlights',
  components: {},
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>
