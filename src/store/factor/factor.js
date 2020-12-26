import alert from '@/plugins/alert'
import { Factor } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    factors: []
  },
  actions: {
    async fetchAllFactor({ commit }, options) {
      try {
        const factors = await Factor.fetch(options)
        commit('setFactors', factors)
      } catch (error) {
        alert.error(error)
      }
    }
  },
  mutations: {
    setFactors(state, payload) {
      state.factors = payload
    }
  }
}
