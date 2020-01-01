import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getReplies({ postId }) {
    return apiHelper.get(`/posts/${postId}/replies`)
  },

  postReply(data) {
    return apiHelper.post(`/posts/reply`, data)
  },

  getUserReplies({ userId }) {
    return apiHelper.get(`/users/${userId}/responses`)
  },

  addBookmark(postId) {
    return apiHelper.post(`/posts/${postId}/bookmark`, null, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  deleteBookmark(postId) {
    return apiHelper.delete(`/posts/${postId}/bookmark`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}
