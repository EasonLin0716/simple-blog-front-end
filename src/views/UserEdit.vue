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
        <div>
          <img :src="avatar" alt="avatar" id="avatar" />
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            class="form-control-file"
            @change="handleFileChange"
          />
        </div>
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
      const form = e.target
      const formData = new FormData(form)
      const { data } = await usersAPI.putUser({ formData })
      if (data.status === 'success') {
        this.currentUser.name = this.name
        this.currentUser.introduction = this.introduction
        this.currentUser.avatar = this.avatar
        Toast.fire({
          type: 'success',
          title: '個人資訊修改成功！'
        })
        this.$router.push(`/users/${this.currentUser.id}`)
      }
    },
    handleFileChange(e) {
      const files = e.target.files
      console.log('files', files)
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
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  color: inherit;
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
  border-radius: 50%;
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
