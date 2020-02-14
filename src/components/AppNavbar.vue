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
          class="icon icon-small"
          @click="toggleSearchBox"
        />
        <input
          v-on:keyup.enter="search"
          type="text"
          id="searchBox"
          v-model="searchText"
          style="border: none;width: 1px;"
          ref="searchBox"
          placeholder="search..."
        />
        <font-awesome-icon :icon="['far', 'bell']" class="icon" id="bell" />
        <template v-if="isAuthenticated">
          <router-link to="/payment">
            <button class="navbar-button mr-2 ">Upgrade</button>
          </router-link>
          <a href="#" role="button" data-toggle="dropdown">
            <img
              :src="currentUser.avatar"
              class="size-small rounded-circle"
              alt="profile"
            />
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
          <router-link :to="'/signin'" class="mr-2 navbar-button"
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
  name: 'AppNavbar',
  data() {
    return {
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
    },
    toggleSearchBox() {
      this.$refs.searchBox.style.width =
        this.$refs.searchBox.style.width === '1px' ? '150px' : '1px'
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

.navbar-button {
  padding: 4px 12px;
  border: 0.5px solid #ccc;
  border-radius: 5px;
  transition: background 0.5s;
}

.navbar-button:hover {
  background: #000;
  color: #fff;
}

#searchBox {
  transition: width 0.2s;
}

#bell {
  width: 22px;
  height: 22px;
  margin: 0 5px;
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
