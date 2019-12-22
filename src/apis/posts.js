import { apiHelper } from './../utils/helpers'

export default {
  getPosts() {
    return apiHelper.get(`/posts`)
  },
  getPost({ postId }) {
    return apiHelper.get(`/posts/${postId}`)
  },
  createPost(data) {
    return apiHelper.post(`/posts`, data)
  }
}
