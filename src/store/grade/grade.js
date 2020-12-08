import { Grade } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    grades: []
  },
  actions: {
    async fetchGrades ({ commit }, options) {
      try {
        commit('setGrades', await Grade.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    }
  },
  mutations: {
    setGrades (state, payload) {
      state.grades = payload
    }
  }
}
