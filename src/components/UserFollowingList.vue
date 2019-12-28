<template>
  <div id="user-following-list">
    <h6 id="follows">{{ userName }} follows</h6>
    <div
      v-for="following in followings"
      :key="following.id"
      class="card"
      id="following-card"
    >
      <div id="avatar-box">
        <router-link :to="'/users/' + userId">
          <img :src="following.avatar" alt="avatar" id="avatar" />
        </router-link>
      </div>
      <div id="user-info">
        <router-link :to="'/users/' + userId">
          <h5>{{ following.name }}</h5>
          <p>{{ following.introduction }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFollowingList',
  props: {
    userName: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    followings: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

#follows {
  padding: 0 20px;
  margin: 40px 0 20px 0;
}

#following-card {
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
  border-radius: 50%;
}
</style>
