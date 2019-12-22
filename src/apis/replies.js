import { apiHelper } from './../utils/helpers'

export default {
  getReplies({ postId }) {
    return apiHelper.get(`/posts/${postId}/replies`)
  },

  postReply(data) {
    return apiHelper.post(`/posts/reply`, data)
  }
}
