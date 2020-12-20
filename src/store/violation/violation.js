import { Violation } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    violations: []
  },
  actions: {
    async fetchViolations ({ commit }, options) {
      try {
        commit('setViolations', await Violation.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
  },
  mutations: {
    setViolations (state, payload) {
      state.violations = payload
    },
  }
}