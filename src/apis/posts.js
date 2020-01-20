import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getPosts() {
    return apiHelper.get(`/posts`)
  },
  getPost(postId) {
    return apiHelper.get(`/posts/${postId}`)
  },
  createPost(data) {
    return apiHelper.post(`/posts`, data)
  },
  putPost(formData, postId) {
    return apiHelper.put(`posts/${postId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deletePost(postId) {
    return apiHelper.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  searchPost(searchText) {
    return apiHelper.get(`/search?q=${searchText}`)
  }
}
