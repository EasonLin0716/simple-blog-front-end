<template>
  <div id="user-following-list">
    <h6 id="follows">{{ userName }} is followed by</h6>
    <div
      v-for="follower in followers"
      :key="follower.id"
      class="card"
      id="follower-card"
    >
      <div id="avatar-box">
        <router-link :to="'/users/' + follower.id">
          <img
            :src="follower.avatar"
            alt="avatar"
            id="avatar"
            class="rounded-circle"
          />
        </router-link>
      </div>
      <div id="user-info">
        <router-link :to="'/users/' + follower.id">
          <h5>{{ follower.name }}</h5>
          <p>{{ follower.introduction }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFollowerList',
  props: {
    userName: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    followers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
a {
  color: #333;
}

a:hover {
  color: #000;
}

#follows {
  padding: 0 20px;
  margin: 40px 0 20px 0;
}

#follower-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
}

#avatar-box {
  margin-right: 20px;
}

#avatar {
  width: 60px;
  height: 60px;
}
</style>
