<template>
  <div id="user-info">
    <div id="info">
      <div id="content">
        <h1>{{ user.name }}</h1>
        <a href="#">
          <span class="badge badge-success" id="edit">Edit profile</span>
        </a>
        <p>{{ user.introduction }}</p>
      </div>
      <div>
        <img :src="user.avatar" alt="avatar" />
      </div>
    </div>
    <br />
    <div id="links">
      <div id="link">
        <router-link :to="'/users/' + user.id">
          Profile
        </router-link>
      </div>
      <div id="link">
        <router-link :to="'/users/' + user.id + '/claps'">
          Claps
        </router-link>
      </div>
      <div id="link">
        <router-link :to="'/users/' + user.id + '/highlights'">
          Highlights
        </router-link>
      </div>
      <div id="link">
        <router-link :to="'/users/' + user.id + '/responses'">
          Responses
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { emptyImageFilter } from './../utils/mixins'
import userAPI from './../apis/user'
export default {
  name: 'UserInfo',
  mixins: [emptyImageFilter],
  data() {
    return {}
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
#info {
  display: flex;
  align-items: center;
}

#info #content {
  padding-right: 40px;
}

#links {
  display: flex;
  border-bottom: 1px solid rgb(200, 200, 200);
}

#links #link {
  margin: 0 20px 10px 0;
}

h1 {
  display: inline;
  margin-right: 16px;
}

#edit {
  padding: 2px 8px;
  font-size: 14.5px;
}

img {
  border-radius: 50%;
  width: 128px;
  height: 128px;
}
</style>
