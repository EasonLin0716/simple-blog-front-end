import { apiHelper } from './../utils/helpers'

export default {
  getReplies({ postId }) {
    return apiHelper.get(`/posts/${postId}/replies`)
  }
}
