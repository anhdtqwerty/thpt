import { Violation } from '@/plugins/api'
import alert from '@/plugins/alert'
export default {
  namespaced: true,
  state: {
    violations: []
  },
  actions: {
    async fetchViolation({ commit }, options) {
      try {
        commit('setViolation', await Violation.fetch(options))
      } catch (e) {
        alert.error(e)
      }
    },
    async removeViolation({ commit }, id) {
      try {
        await Violation.remove(id)
        commit('removeViolation', id)
        alert.success('Xóa thành công!')
      } catch (e) {
        alert.error(e)
      }
    },
    async createViolation({ commit }, data) {
      try {
        commit('createViolation', await Violation.create(data))
      } catch (e) {
        alert.error(e)
      }
    },
    async updateViolation({ commit }, { id, ...violation }) {
      try {
        const vil = await Violation.update(id, violation)
        commit('updateViolation', {id,vil})
        alert.success('Cập nhật thành công!')
      } catch (e) {
        alert.error(e)
      }
    }
  },
  mutations: {
    setViolation(state, violation) {
      state.violations = violation
    },
    removeViolation(state, id) {
      state.violations = state.violations.filter(
        violation => violation.id != id
      )
    },
    createViolation(state, violation) {
      state.violations = [violation, ...state.violations]
    },
    updateViolation(state, violation) {
      state.violations = state.violations.map(v =>  {if (violation.id === v.id) return violation.vil
      else return v})
    }
  }
}
