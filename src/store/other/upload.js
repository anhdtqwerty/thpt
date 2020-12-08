import axios from '@/plugins/axios'
import alert from '@/plugins/alert'
const UPLOAD_API = '/upload/'
const DESTROY_API = '/upload/files/'
export default {
  namespaced: true,
  state: {
    url: null,
    isLoading: false,
    response: false
  },
  actions: {
    upload ({ commit }, formData) {
      commit('setLoading', true)
      return axios.post(UPLOAD_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response)
          commit('setURL', response[0].url)
          commit('setLoading', false)
          alert.success('Upload successfully!')
        })
        .catch(e => alert.error(e))
    },
    destroy ({ commit }, id) {
      commit('setLoading', true)
      return axios.delete(DESTROY_API + id)
        .then(staff => {
          console.log('Remove success')
        })
        .catch(e => alert.error(e))
    }
  },
  mutations: {
    setURL (state, staffs) {
      state.staffs = staffs
    },
    setLoading (state, bool) {
      state.isLoading = bool
    }
  },
  getters: {
    url: (state) => {
      return state.url
    },
    isLoading: (state) => {
      return state.isLoading
    }
  }
}
