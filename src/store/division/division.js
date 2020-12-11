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
    },
    async removeDivision({ commit }, id) {
      try {
        await Division.remove(id)
        commit('removeDivision', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async createDivision({ commit }, data) {
      try {
        commit('setDivision', await Division.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    setDivision({ commit, state }, generation) {
      commit('setGeneration', generation)
    },
  },
  mutations: {
    setDivision (state, payload) {
      state.divisions = payload
    },
    removeDivision(state,id){
      state.divisions = state.divisions.filter(division => division.id != id)
    }
  }
}
