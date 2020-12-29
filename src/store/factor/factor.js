import { Factor } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    factors: [],
    factor: {}
  },
  actions: {
    async fetchFactors({ commit }, options) {
      try {
        commit('setFactors', await Factor.fetch(options))
      } catch (error) {
        alert.error(error)
      }
    },
    async fetchFactor({ commit }, id) {
      try {
        commit('setFactor', await Factor.fetchOne(id))
      } catch (error) {
        alert.error(error)
      }
    },
    async createFactor({ commit }, data) {
      try {
        commit('createFactor', await Factor.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeFactor({ commit }, id) {
      try {
        await Factor.remove(id)
        commit('removeFactor', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async updateFactor({ commit }, { id, ...factor }) {
      try {
        const res = await Factor.update(id, factor)
        commit('updateFactor', { id, factor: res })
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async setFactors({ commit }, factors) {
      commit('setFactors', factors)
    }
  },
  mutations: {
    setFactors(state, factors) {
      state.factors = factors
    },
    setFactor(state, factor) {
      state.factor = factor
    },
    updateFactor(state, { factor, id }) {
      state.factors = state.factors.map(g => {
        if (g.id === id) return factor
        else return g
      })
      state.factor = factor
    },
    createFactor(state, factor) {
      state.factors = [factor, ...state.factors]
    },
    removeFactor(state, id) {
      state.factors = state.factors.filter(factor => factor.id !== id)
    }
  }
}
