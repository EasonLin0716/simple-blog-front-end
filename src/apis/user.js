import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getClaps({ userId }) {
    return apiHelper.get(`/users/${userId}/claps`)
  },
  follow(userId) {
    return apiHelper.post(`/users/${userId}/follow`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  unfollow(userId) {
    return apiHelper.delete(`/users/${userId}/follow`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
