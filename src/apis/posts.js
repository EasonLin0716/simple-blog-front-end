import { apiHelper } from './../utils/helpers'

export default {
  getPosts() {
    return apiHelper.get(`/posts`)
  }
}
