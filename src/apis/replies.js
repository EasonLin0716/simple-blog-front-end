import { apiHelper } from './../utils/helpers'

export default {
  getReplies({ postId }) {
    return apiHelper.get(`/posts/${postId}/replies`)
  },

  postReply({ postId }) {
    return apiHelper.post(`/posts/${postId}/reply`)
  }
}
