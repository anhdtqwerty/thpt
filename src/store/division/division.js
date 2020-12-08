import { Division } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    divisions: []
  },
  actions: {
    async fetchDivision ({ commit }, options) {
      try {
        commit('setDivision', await Division.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    }
  },
  mutations: {
    setDivision (state, payload) {
      state.divisions = payload
    }
  }
}
