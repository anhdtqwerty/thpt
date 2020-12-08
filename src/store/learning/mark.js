import alert from '@/plugins/alert'
import { Mark } from '@/plugins/api'

export default {
  namespaced: true,
  state: {
    marks: {},
    count: 0
  },
  actions: {
    async fetchMarks ({ commit }, options) {
      commit('setMarks', await Mark.fetch(options))
    },
    async countMarks ({ commit }, options) {
      commit('setCount', await Mark.count(options))
    },
    async fetchMark ({ commit }, markId) {
      commit('setMark', await Mark.fetchOne(markId))
    },
    // api is create or update. If record exist then create.
    async createMark ({ commit }, { data, options }) {
      commit('setMark', await Mark.create(data, options))
      alert.success('Cập nhật thành công!')
    },
    async removeMark ({ commit }, id) {
      await Mark.remove(id)
      commit('removeMark', id)
      alert.success('Xóa thành công!')
    },
    setMark ({ commit, state }, mark) {
      commit('setMark', mark)
    },
    async removeMarks ({ dispatch }, items) {
      for (let item of items) {
        await dispatch('removeMark', item.id)
      }
    },
    async updateMarks ({ dispatch }, items) {
      await Promise.all(items.map(item => dispatch('createMark', { data: item })))
    }
  },
  mutations: {
    setMarks (state, marks) {
      state.marks = marks.reduce((accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.id]: currentValue
      }), {})
    },
    setMark (state, mark) {
      state.marks = {
        ...state.marks,
        [mark.id]: mark
      }
    },
    removeMark (state, markId) {
      delete state.marks[markId]
      state.marks = { ...state.marks }
    },
    setCount (state, count) {
      state.count = count
    }

  },
  getters: {
    marks: (state) => {
      return Object.values(state.marks)
    },
    mark: (state) => (id) => {
      return state.marks[id]
    },
    count: (state) => {
      return state.count
    }
  }
}
