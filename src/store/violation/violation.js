import { Violation } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    violations: []
  },
  actions: {
    async fetchViolation ({ commit }, options) {
      try {
        commit('setViolation', await Violation.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeDivision({ commit }, id) {
      try {
        await Violation.remove(id)
        commit('removeViolation', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
  },
  mutations: {
    setViolation(state, payload) {
      state.violations = payload
    },
    removeViolation(state, id) {
      state.violations = state.violations.filter(violation => violation.id != id)
    },
  }
}