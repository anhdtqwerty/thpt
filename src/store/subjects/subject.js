import alert from '@/plugins/alert'
import { Subject } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    subjects: []
  },
  actions: {
    async fetchSubject ({ commit }, options) {
      try {
        commit('setSubjects', await Subject.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
  },
  mutations: {
    setSubjects (state, subjects) {
      state.subjects = subjects
    }
  }
}
