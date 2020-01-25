<template>
  <div id="navbar">
    <nav class="d-flex justify-content-between align-items-center container">
      <div class="col-left pl-4">
        <router-link to="/posts">
          <img src="../assets/S.png" alt="logo" id="logo-md" />
          <img
            src="../assets/Simple.jpg"
            id="logo"
            width="112"
            height="22"
            alt="logo"
          />
        </router-link>
      </div>
      <div class="col-right d-flex justify-content-between align-items-center">
        <font-awesome-icon
          icon="search"
          id="search"
          @click="searchBox = !searchBox"
        />
        <input
          v-if="searchBox"
          v-on:keyup.enter="search"
          type="text"
          id="searchBox"
          v-model="searchText"
          placeholder="search..."
        />
        <font-awesome-icon :icon="['far', 'bell']" id="bell" />
        <template v-if="isAuthenticated">
          <router-link to="/payment">
            <button id="upgrade">Upgrade</button>
          </router-link>
          <a href="#" role="button" data-toggle="dropdown">
            <img :src="currentUser.avatar" id="profile" alt="profile" />
            <div class="dropdown-menu">
              <router-link to="/posts/create" class="dropdown-item"
                >New Story</router-link
              >
              <router-link to="/users/stories/public" class="dropdown-item"
                >Stories</router-link
              >
              <router-link
                :to="'/users/' + currentUser.id"
                class="dropdown-item"
                >Profile</router-link
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click="logout">Signout</a>
            </div>
          </a>
        </template>
        <template v-else>
          <router-link :to="'/signin'" id="sign-in" class="mr-2"
            >Signin</router-link
          >
          <img
            src="../assets/Profile.png"
            width="32"
            height="32"
            id="profile"
            alt="profile"
          />
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
export default {
  name: 'Navbar',
  data() {
    return {
      searchBox: false,
      searchText: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    search() {
      this.searchText = this.searchText.trim()
      if (this.searchText === '') {
        Toast.fire({
          icon: 'warning',
          title: '請輸入您要搜尋的文字！'
        })
      } else {
        this.$router.push(`/search?q=${this.searchText}`)
      }
    },
    logout() {
      this.$store.commit('revokeAuthentication')
    }
  }
}
</script>
<style scoped>
#logo-md {
  display: none;
}

#navbar {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  height: 65px;
  box-shadow: 0 0 5px 0 rgb(200, 200, 200);
}

#bell {
  margin: 15px 0;
  font-size: 20px;
}

#search,
#bell {
  margin-right: 16px;
  font-size: 20px;
  cursor: pointer;
}

#profile {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

#upgrade {
  margin-right: 10px;
}

#upgrade,
#sign-in,
#logout {
  padding: 4px 12px;
  border: 0.5px solid #ccc;
  border-radius: 5px;
}

#searchBox {
  border: none;
}

@media screen and (max-width: 720px) {
  #logo {
    display: none;
  }
  #logo-md {
    display: block;
  }
}
</style>
