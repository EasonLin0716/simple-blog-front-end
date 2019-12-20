import { apiHelper } from '../utils/helpers'

export default {
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getClaps({ userId }) {
    return apiHelper.get(`/users/${userId}/claps`)
  }
}
