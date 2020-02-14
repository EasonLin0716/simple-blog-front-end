<template>
  <div id="user-edit">
    <form @submit.stop.prevent="handlePutUser" enctype="multipart/form-data">
      <div id="info">
        <div>
          <input name="name" id="name" type="text" :value="name" required />
          <textarea
            v-model="introduction"
            name="introduction"
            id="introduction"
            rows="2"
            maxlength="50"
            required
          >
          </textarea>
        </div>
        <label
          for="image"
          id="image-container"
          class="rounded-circle"
          v-bind:style="{ backgroundImage: 'url(' + avatar + ')' }"
        >
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            class="form-control-file"
            @change="handleFileChange"
            style="display:none"
          />
          <font-awesome-icon :icon="['fas', 'camera']" id="camera" />
        </label>
      </div>
      <div id="follow">
        <span>{{ currentUser.followingUserId.length }} Following</span>
        <span>{{ currentUser.followerUserId.length }} Followers</span>
      </div>
      <div id="buttons">
        <button type="submit" class="btn btn-success">Save</button>
        <router-link
          :to="'/users/' + currentUser.id"
          class="btn btn-secondary"
          id="cancel"
        >
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import usersAPI from './../apis/user'
export default {
  name: 'UserEdit',
  data() {
    return {
      name: '',
      introduction: '',
      avatar: ''
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async handlePutUser(e) {
      try {
        const form = e.target
        const formData = new FormData(form)
        const { data } = await usersAPI.putUser({ formData })
        if (data.status === 'success') {
          this.currentUser.name = this.name
          this.currentUser.introduction = this.introduction
          this.currentUser.avatar = this.avatar
          Toast.fire({
            icon: 'success',
            title: '個人資訊修改成功！'
          })
          this.$router.push(`/users/${this.currentUser.id}`)
        }
      } catch (error) {
        Toast.fire({
          icon: 'success',
          title: '無法取得個人資訊，請稍後再試！'
        })
      }
    },
    handleFileChange(e) {
      const files = e.target.files
      const imageURL = window.URL.createObjectURL(files[0])
      this.avatar = imageURL
    }
  },
  created() {
    this.name = this.currentUser.name
    this.introduction = this.currentUser.introduction
    this.avatar = this.currentUser.avatar
  }
}
</script>

<style scoped>
label {
  margin: 0;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 150px;
}
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  color: inherit;
}
#camera {
  font-size: 50px;
  margin: 25px;
  color: #666;
  opacity: 0.7;
}

#camera:hover {
  color: #000;
}

textarea,
input {
  border: none;
  width: 100%;
}
textarea:focus,
input:focus {
  outline: none;
}

#image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#user-edit {
  margin: 0 auto;
  padding: 0 20px 20px 20px;
  width: 640px;
}

#info {
  display: flex;
  align-items: center;
}

#name {
  font-size: 32px;
  font-weight: bold;
}

#introduction {
  font-size: 24px;
}

#avatar {
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
}

#follow span,
#buttons button {
  margin-right: 8px;
}

#buttons {
  margin-top: 8px;
}

#buttons button,
#cancel {
  padding-left: 18px;
  padding-right: 18px;
}
</style>
