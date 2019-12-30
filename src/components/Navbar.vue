<template>
  <div id="navbar">
    <nav class="d-flex justify-content-between align-items-center container">
      <div class="col-left pl-4">
        <a href="/"><img src="https://fakeimg.pl/112x22/" alt="logo"/></a>
      </div>
      <div class="col-right d-flex justify-content-between align-items-center">
        <font-awesome-icon icon="search" id="search" />
        <font-awesome-icon :icon="['far', 'bell']" id="bell" />
        <template v-if="isAuthenticated">
          <button id="upgrade">Upgrade</button>
          <button id="logout" @click="logout">Logout</button>
          <a :href="'/#/users/' + currentUser.id">
            <img :src="currentUser.avatar" id="profile" alt="profile" />
          </a>
        </template>
        <template v-else>
          <router-link :to="'/signin'" id="sign-in">Signin</router-link>
          <img src="https://fakeimg.pl/32x32/" id="profile" alt="profile" />
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.commit('revokeAuthentication')
    }
  }
}
</script>
<style scoped>
#navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  height: 65px;
  box-shadow: 0 0 5px 0 rgb(200, 200, 200);
}

.col-right {
  width: 218px;
}

#bell {
  margin: 15px 0;
  font-size: 20px;
}

#search {
  margin: 0 10px 0 16px;
  font-size: 20px;
}

#profile {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
#upgrade,
#sign-in,
#logout {
  padding: 4px 12px;
  border: 0.5px solid #ccc;
  border-radius: 5px;
}
</style>
