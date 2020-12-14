import alert from '@/plugins/alert'
import { Subject } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    subject: []
  },
  actions: {
    async fetchSubject ({ commit }, options) {
      try {
        commit('setSubject', await Subject.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
  },
  mutations: {

  },
  getters: {}
}
