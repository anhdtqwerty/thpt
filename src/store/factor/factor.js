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
        await Factor.create({ ...data, semesterType: 'semester-2' })
        commit('createFactor', await Factor.create({ ...data, semesterType: 's        ' }))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeFactor({ commit }, { semester1Id, semester2Id }) {
      try {
        await Factor.remove(semester1Id)
        await Factor.remove(semester2Id)
        commit('removeFactor', semester1Id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async updateFactor({ commit }, { factor, force = true }) {
      try {
        const { id } = factor
        const res = await Factor.update(id, factor)
        if (force) {
          commit('updateFactor', { id, factor: res })
          alert.success('Cập nhật thành công!')
        }
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
